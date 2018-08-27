import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { nodeInterface } from '../interface';
import { globalIdField } from '../node';
import { User } from './User';

export const Account = new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    id: globalIdField(),

    extid: {
      type: new GraphQLNonNull(GraphQLString),
    },

    name: {
      type: GraphQLString,
    },

    email: {
      type: GraphQLString,
    },

    user: {
      type: User,
      resolve: root => root,
    },
  }),
  interfaces: [nodeInterface],
});
