/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type LogoutInput = {
    readonly clientMutationId?: string | null;
};
export type LogoutMutationVariables = {
    readonly input: LogoutInput;
};
export type LogoutMutationResponse = {
    readonly logout: ({
        readonly viewer: {
            readonly id: string;
        };
    }) | null;
};
export type LogoutMutation = {
    readonly response: LogoutMutationResponse;
    readonly variables: LogoutMutationVariables;
};



/*
mutation LogoutMutation(
  $input: LogoutInput!
) {
  logout(input: $input) {
    viewer {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "LogoutInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "logout",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "LogoutInput!"
      }
    ],
    "concreteType": "LogoutPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "LogoutMutation",
  "id": null,
  "text": "mutation LogoutMutation(\n  $input: LogoutInput!\n) {\n  logout(input: $input) {\n    viewer {\n      id\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "LogoutMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": v1
  },
  "operation": {
    "kind": "Operation",
    "name": "LogoutMutation",
    "argumentDefinitions": v0,
    "selections": v1
  }
};
})();
(node as any).hash = 'bac43e8ff56e3b8759a468ccf29c0267';
export default node;
