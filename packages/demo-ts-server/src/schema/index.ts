import { GraphQLSchema } from 'graphql';
import { Mutation } from './types/Mutation';
import { Query } from './types/Query';

export const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
