import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import * as DB from '../../db';
import { Context, genRandomCode } from '../../utils';

interface InputFields {
  email: string;
}

interface OutputFields {
  code_token?: string;
  errors?: string;
}

export const RequestCode = mutationWithClientMutationId({
  name: 'RequestCode',
  inputFields: {
    email: {
      type: GraphQLString,
    },
  },
  outputFields: {
    code_token: {
      type: GraphQLString,
    },
    errors: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (input: InputFields, context: Context): Promise<OutputFields> => {
    console.log('requestCode', input);
    const res: OutputFields = {};
    const code = genRandomCode();
    const { email } = input;
    if (!DB.doesEmailLookValid(email)) {
      res.errors = 'Invalid email';
      return res;
    }
    const record = await DB.EmailVerification.create({ email, code });
    console.log('>', record['dataValues']);
    res.code_token = record.id;
    return res;
  },
});
