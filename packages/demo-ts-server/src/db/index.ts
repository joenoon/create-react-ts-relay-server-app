import * as Sequelize from 'sequelize';
import { emailVerificationFactory, EmailVerificationInstance } from './EmailVerification';
import { projectFactory, ProjectInstance } from './Project';
import { userFactory, UserInstance } from './User';

const DB_NAME = 'dev';
const DB_USERNAME = 'postgres';
const DB_PASSWORD = 'postgres';
const DB_HOST = 'localhost';
const DB_PORT = 5432;
const DB_SSL = false;

export const isDev = process.env.NODE_ENV != 'production';

export const sequelize = new Sequelize.default(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  logging: false,
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: DB_SSL,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 30000,
    acquire: 20000,
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: false,
  },
});

export const User = userFactory(sequelize);
export { UserInstance };
export { EmailVerificationInstance };
export { ProjectInstance };
export const EmailVerification = emailVerificationFactory(sequelize);
export const Project = projectFactory(sequelize);

const DB = {
  User,
  EmailVerification,
  Project,
};

Object.values(DB).forEach((model: any) => {
  if (model.associate) {
    model.associate(DB);
  }
});

export const doesEmailLookValid = function(email): boolean {
  const str = email || '';
  const parts = str.split('@').filter(x => x);
  if (parts.length === 2) {
    const domain = parts[1];
    const domain_parts = domain.split('.').filter(x => x);
    if (domain_parts.length > 1) {
      return true;
    }
  }
  return false;
};

export const ensureForEmail = async function(email): Promise<UserInstance | null> {
  email = email || '';
  email = email.toLowerCase().trim();
  if (doesEmailLookValid(email)) {
    const now = new Date();
    const user = await sqlSelectOne(
      `
    insert into users (id, extid, email, updated_at, created_at)
    values (gen_random_uuid(), gen_random_uuid(), $email, $now, $now)
    on conflict (email) do update
    set updated_at = $now
    returning *
    `,
      {
        model: DB.User,
        bind: {
          email,
          now,
        },
      }
    );
    return user;
  }
  return null;
};

function debugStringForQuery(query, opts: any = {}) {
  let str = `${query}`;
  if (opts.bind) {
    for (const k of Object.keys(opts.bind)) {
      str = str.split(`$${k}`).join(`'${opts.bind[k]}'`);
    }
  }
  return str;
}

export async function sqlSelect(query, opts: any = {}) {
  if (opts.isDebug) {
    console.log('sqlSelect:------------------------\n', debugStringForQuery(query, opts), '\n------------------------\n');
  }
  return sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
    ...opts,
  });
}

export async function sqlSelectOne(query, opts = {}) {
  return sqlSelect(query, opts).then(arr => (arr && arr[0]) || null);
}

export async function sqlUpdate(query, opts: any = {}) {
  if (opts.isDebug) {
    console.log('sqlUpdate:------------------------\n', debugStringForQuery(query, opts), '\n------------------------\n');
  }
  return new Promise((resolve, reject) => {
    sequelize.query(query, opts).spread((results, metadata) => {
      resolve((metadata as any).rowCount);
    });
  });
}

export async function sqlInsert(query, opts = {}) {
  return sequelize.query(query, {
    type: sequelize.QueryTypes.INSERT,
    ...opts,
  });
}

export async function sqlCount(query, opts = {}) {
  return sequelize
    .query(query, {
      type: sequelize.QueryTypes.SELECT,
      ...opts,
    })
    .then(res => parseInt(res[0].count));
}

export const sqlTransaction = sequelize.transaction.bind(sequelize);
