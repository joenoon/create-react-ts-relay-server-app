import { GraphQLObjectType, GraphQLString } from 'graphql';
import { nodeInterface } from '../interface';
import { globalIdField } from '../node';

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField(),

    name: {
      type: GraphQLString,
    },

    about: {
      type: GraphQLString,
    },

    username: {
      type: GraphQLString,
    },
  }),
  interfaces: [nodeInterface],
});
