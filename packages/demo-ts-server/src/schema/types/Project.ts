import { GraphQLObjectType, GraphQLString } from 'graphql';
import { appConnectionDefinitions } from '../connection';
import { nodeInterface } from '../interface';
import { globalIdField } from '../node';

export const Project = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: globalIdField(),

    name: {
      type: GraphQLString,
    },
  }),
  interfaces: [nodeInterface],
});

export const { connectionType: ProjectConnection } = appConnectionDefinitions({
  name: 'Project',
  nodeType: Project,
});
