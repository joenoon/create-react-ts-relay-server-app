import * as Sequelize from 'sequelize';

interface ProjectAttributes {
  id?: string;
  name?: string | null;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type ProjectInstance = Sequelize.Instance<ProjectAttributes> & ProjectAttributes;

export function projectFactory(sequelize: Sequelize.Sequelize) {
  const attributes = {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: sequelize.fn('gen_random_uuid'),
    },
    name: { type: Sequelize.TEXT, allowNull: false },
  };
  const Project = sequelize.define<ProjectInstance, ProjectAttributes>('Project', attributes);
  Project.associate = ({ User }) => {
    Project.belongsTo(User, { foreignKey: { allowNull: false, name: 'user_id' } });
  };
  return Project;
}
