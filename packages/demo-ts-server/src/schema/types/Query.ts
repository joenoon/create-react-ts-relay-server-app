import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { nodeField } from '../interface';
import { Viewer } from './Viewer';

const EMPTY = {};

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: new GraphQLNonNull(Viewer),
      resolve: () => EMPTY,
    },
  }),
});
