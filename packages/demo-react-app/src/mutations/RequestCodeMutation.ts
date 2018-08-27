import { commitMutation, graphql } from 'react-relay';
import {RequestCodeInput, RequestCodeMutationResponse} from '../__generated__/RequestCodeMutation.graphql';

const mutation = graphql`
  mutation RequestCodeMutation($input: RequestCodeInput!) {
    requestCode(input: $input) {
      errors
      code_token
    }
  }
  `;

let nextClientMutationId = 0;

export function requestCode(environment, input: RequestCodeInput, extra = {}): Promise<{response: RequestCodeMutationResponse; errors: any}> {
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
