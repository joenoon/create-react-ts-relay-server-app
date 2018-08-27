import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import * as DB from '../../db';
import { Context } from '../../utils';
import { Project } from '../types/Project';
import { Viewer } from '../types/Viewer';

interface InputFields {
  name: string;
}

interface OutputFields {
  viewer?: any;
  project?: any;
  errors?: string;
}

export const CreateProject = mutationWithClientMutationId({
  name: 'CreateProject',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    viewer: {
      type: new GraphQLNonNull(Viewer),
    },
    project: {
      type: Project,
    },
    errors: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async (input: InputFields, context: Context): Promise<OutputFields> => {
    const user = await context.getUser();
    if (!user || !user.id) {
      throw new Error('no auth');
    }
    const res: OutputFields = {};
    const { name } = input;
    try {
      const record = await DB.Project.create({
        user_id: user.id,
        name: name,
      });
      res.project = record;
      res.viewer = {};
    } catch (err) {
      console.log('err', err);
      res.errors = 'Oops. Something went wrong.';
    }
    return res;
  },
});
