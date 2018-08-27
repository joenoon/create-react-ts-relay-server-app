/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type RequestCodeInput = {
    readonly email?: string | null;
    readonly clientMutationId?: string | null;
};
export type RequestCodeMutationVariables = {
    readonly input: RequestCodeInput;
};
export type RequestCodeMutationResponse = {
    readonly requestCode: ({
        readonly errors: string | null;
        readonly code_token: string | null;
    }) | null;
};
export type RequestCodeMutation = {
    readonly response: RequestCodeMutationResponse;
    readonly variables: RequestCodeMutationVariables;
};



/*
mutation RequestCodeMutation(
  $input: RequestCodeInput!
) {
  requestCode(input: $input) {
    errors
    code_token
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "RequestCodeInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "requestCode",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "RequestCodeInput!"
      }
    ],
    "concreteType": "RequestCodePayload",
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
        "name": "code_token",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "RequestCodeMutation",
  "id": null,
  "text": "mutation RequestCodeMutation(\n  $input: RequestCodeInput!\n) {\n  requestCode(input: $input) {\n    errors\n    code_token\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "RequestCodeMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "RequestCodeMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = '5ef2d49077a63780c0557976efd993e7';
export default node;
