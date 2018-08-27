import { commitMutation, graphql } from 'react-relay';
import {CreateProjectInput, CreateProjectMutationResponse} from '../__generated__/CreateProjectMutation.graphql';

const mutation = graphql`
  mutation CreateProjectMutation($input: CreateProjectInput!) {
    createProject(input: $input) {
      errors
      viewer {
        id
        ...Dashboard_viewer
      }
    }
  }
  `;

let nextClientMutationId = 0;

export function createProject(environment, input: CreateProjectInput, extra = {}): Promise<{response: CreateProjectMutationResponse; errors: any}> {
  const clientMutationId = nextClientMutationId++;
  return new Promise((resolve, reject) => {

    commitMutation(environment, {
      mutation,
      variables: {
        input: { ...input, clientMutationId },
      },
      onCompleted(response, errors) {
        resolve({response, errors});
      },
      onError(error) {
        reject(error);
      },
      ...extra,
    });

  });
}
