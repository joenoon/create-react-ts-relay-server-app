import { commitMutation, graphql } from 'react-relay';
import { GRAPHQL_AUTH_TOKEN } from '../components/common';
import {LogoutInput, LogoutMutationResponse} from '../__generated__/LogoutMutation.graphql';

const mutation = graphql`
  mutation LogoutMutation($input: LogoutInput!) {
    logout(input: $input) {
      viewer {
        id
      }
    }
  }
  `;

let nextClientMutationId = 0;

export function logout(environment, input: LogoutInput = {}, extra = {}): Promise<{response: LogoutMutationResponse; errors: any}> {
  const clientMutationId = nextClientMutationId++;
  return new Promise((resolve, reject) => {

    commitMutation(environment, {
      mutation,
      variables: {
        input: { ...input, clientMutationId },
      },
      onCompleted(response: LogoutMutationResponse, errors) {
        if (response.logout) {
          localStorage.removeItem(GRAPHQL_AUTH_TOKEN);
        }
        resolve({response, errors});
      },
      onError(error) {
        reject(error);
      },
      ...extra,
    });

  });
}
