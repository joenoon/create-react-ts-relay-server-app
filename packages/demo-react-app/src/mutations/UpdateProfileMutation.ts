// import { commitMutation, graphql } from 'react-relay';

// const mutation = graphql`
//   mutation UpdateProfileMutation($input: UpdateProfileInput!) {
//     updateProfile(input: $input) {
//       me {
//         id
//         ...Account_account
//       }
//     }
//   }
//   `;

// let nextClientMutationId = 0;

// export function updateProfile(environment, input, extra = {}): Promise<{response: any; errors: any}> {
//   const clientMutationId = nextClientMutationId++;
//   return new Promise((resolve, reject) => {

//     commitMutation(environment, {
//       mutation,
//       variables: {
//         input: { ...input, clientMutationId },
//       },
//       onCompleted(response, errors) {
//         resolve({response, errors});
//       },
//       onError(error) {
//         reject(error);
//       },
//       ...extra,
//     });

//   });
// }
