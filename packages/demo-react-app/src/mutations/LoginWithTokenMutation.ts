import { commitMutation, graphql } from 'react-relay';
import { GRAPHQL_AUTH_TOKEN } from '../components/common';
import {LoginWithTokenInput, LoginWithTokenMutationResponse} from '../__generated__/LoginWithTokenMutation.graphql';

const mutation = graphql`
  mutation LoginWithTokenMutation($input: LoginWithTokenInput!) {
    loginWithToken(input: $input) {
      jwt
      errors
      viewer {
        id
        email
        name
      }
    }
  }
  `;

let nextClientMutationId = 0;

export function loginWithToken(environment, input: LoginWithTokenInput, extra = {}): Promise<{response: LoginWithTokenMutationResponse; errors: any}> {
  const clientMutationId = nextClientMutationId++;
  return new Promise((resolve, reject) => {

    commitMutation(environment, {
      mutation,
      variables: {
        input: { ...input, clientMutationId },
      },
      onCompleted(response: LoginWithTokenMutationResponse, errors) {
        if (response.loginWithToken && response.loginWithToken.jwt) {
          console.log('loginWithToken set', response.loginWithToken.jwt);
          localStorage.setItem(GRAPHQL_AUTH_TOKEN, response.loginWithToken.jwt);
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
