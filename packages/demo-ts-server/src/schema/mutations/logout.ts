import { GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../utils';
import { Viewer } from '../types/Viewer';

interface InputFields {}

interface OutputFields {
  viewer?: any;
}

export const Logout = mutationWithClientMutationId({
  name: 'Logout',
  inputFields: {},
  outputFields: {
    viewer: {
      type: new GraphQLNonNull(Viewer),
    },
  },
  mutateAndGetPayload: async (input: InputFields, context: Context): Promise<OutputFields> => {
    console.log('logout');
    context.extid = undefined;
    const res: OutputFields = {};
    res.viewer = {};
    return res;
  },
});
