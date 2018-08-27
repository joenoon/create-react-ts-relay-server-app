import * as Sequelize from 'sequelize';

interface EmailVerificationAttributes {
  id?: string;
  email: string;
  code: string;
  fails?: number;
  auth_token?: string;
  verified_at?: Date;
  used_at?: Date;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type EmailVerificationInstance = Sequelize.Instance<EmailVerificationAttributes> & EmailVerificationAttributes;

export function emailVerificationFactory(sequelize: Sequelize.Sequelize) {
  const attributes = {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: sequelize.fn('gen_random_uuid'),
    },
    email: { type: Sequelize.TEXT, allowNull: false },
    code: { type: Sequelize.TEXT, allowNull: false },
    fails: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    auth_token: { type: Sequelize.UUID, allowNull: false, defaultValue: sequelize.fn('gen_random_uuid') },
    verified_at: { type: Sequelize.DATE },
    used_at: { type: Sequelize.DATE },
  };
  const EmailVerification = sequelize.define<EmailVerificationInstance, EmailVerificationAttributes>('EmailVerification', attributes);
  EmailVerification.associate = ({ User }) => {
    EmailVerification.belongsTo(User, { foreignKey: { allowNull: true, name: 'user_id' } });
  };
  return EmailVerification;
}
