/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type RequestTokenInput = {
    readonly code_token?: string | null;
    readonly code?: string | null;
    readonly clientMutationId?: string | null;
};
export type RequestTokenMutationVariables = {
    readonly input: RequestTokenInput;
};
export type RequestTokenMutationResponse = {
    readonly requestToken: ({
        readonly errors: string | null;
        readonly auth_token: string | null;
    }) | null;
};
export type RequestTokenMutation = {
    readonly response: RequestTokenMutationResponse;
    readonly variables: RequestTokenMutationVariables;
};



/*
mutation RequestTokenMutation(
  $input: RequestTokenInput!
) {
  requestToken(input: $input) {
    errors
    auth_token
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "RequestTokenInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "requestToken",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "RequestTokenInput!"
      }
    ],
    "concreteType": "RequestTokenPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "errors",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "auth_token",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "RequestTokenMutation",
  "id": null,
  "text": "mutation RequestTokenMutation(\n  $input: RequestTokenInput!\n) {\n  requestToken(input: $input) {\n    errors\n    auth_token\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "RequestTokenMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "RequestTokenMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = 'f690b0a2500833b8e728099000502177';
export default node;
