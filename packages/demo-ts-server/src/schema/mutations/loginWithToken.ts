import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import * as DB from '../../db';
import { Context, createAuth } from '../../utils';
import { Viewer } from '../types/Viewer';

interface InputFields {
  auth_token: string;
}

interface OutputFields {
  jwt?: string;
  viewer?: any;
  errors?: string;
}

export const LoginWithToken = mutationWithClientMutationId({
  name: 'LoginWithToken',
  inputFields: {
    auth_token: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    jwt: {
      type: GraphQLString,
    },
    viewer: {
      type: new GraphQLNonNull(Viewer),
    },
    errors: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (input: InputFields, context: Context): Promise<OutputFields> => {
    const res: OutputFields = {};
    console.log('loginWithToken', input);
    const { auth_token } = input;
    const record = await DB.EmailVerification.findOne({
      where: {
        auth_token,
      },
    });
    // add time check
    if (!record || !record.verified_at || record.used_at) {
      res.errors = 'Ooops. No record';
      return res;
    }
    const { email } = record;
    const user = await DB.ensureForEmail(email);
    if (!user) {
      res.errors = 'Ooops. No user created';
      return res;
    }
    try {
      const { extid } = user;
      res.jwt = createAuth({ extid });
      context.getUser = async () => user;
      context.extid = extid;
    } catch (err) {
      console.log('err', err);
      res.errors = 'Oops. Something went wrong.';
      return res;
    }
    res.viewer = {};
    return res;
  },
});
