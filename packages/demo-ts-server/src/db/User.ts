import * as Sequelize from 'sequelize';

interface UserAttributes {
  id?: string;
  extid: string;
  email: string;
  name?: string | null;
  username?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;

export function userFactory(sequelize: Sequelize.Sequelize) {
  const attributes = {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: sequelize.fn('gen_random_uuid'),
    },
    extid: { type: Sequelize.UUID, allowNull: false },
    email: { type: Sequelize.TEXT, allowNull: false },
    name: { type: Sequelize.TEXT },
    username: { type: Sequelize.TEXT },
  };
  return sequelize.define<UserInstance, UserAttributes>('User', attributes);
}
