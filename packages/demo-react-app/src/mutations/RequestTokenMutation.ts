import { commitMutation, graphql } from 'react-relay';
import {RequestTokenInput, RequestTokenMutationResponse} from '../__generated__/RequestTokenMutation.graphql';

const mutation = graphql`
  mutation RequestTokenMutation($input: RequestTokenInput!) {
    requestToken(input: $input) {
      errors
      auth_token
    }
  }
  `;

let nextClientMutationId = 0;

export function requestToken(environment, input: RequestTokenInput, extra = {}): Promise<{response: RequestTokenMutationResponse; errors: any}> {
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
