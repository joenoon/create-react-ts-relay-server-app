import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import * as DB from '../../db';
import { Context } from '../../utils';

interface InputFields {
  code_token: string;
  code: string;
}

interface OutputFields {
  auth_token?: string;
  errors?: string;
}

export const RequestToken = mutationWithClientMutationId({
  name: 'RequestToken',
  inputFields: {
    code_token: {
      type: GraphQLString,
    },
    code: {
      type: GraphQLString,
    },
  },
  outputFields: {
    auth_token: {
      type: GraphQLString,
    },
    errors: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (input: InputFields, context: Context): Promise<OutputFields> => {
    console.log('requestToken', input);
    const res: OutputFields = {};
    const record = await DB.EmailVerification.findById(input.code_token);
    if (!record) {
      res.errors = 'Ooops. No record';
      return res;
    }
    const { email, code, auth_token } = record;
    if (code !== input.code) {
      res.errors = 'Ooops. Wrong code.';
      return res;
    }
    record.verified_at = new Date();
    await record.save();
    res.auth_token = auth_token;
    return res;
  },
});
