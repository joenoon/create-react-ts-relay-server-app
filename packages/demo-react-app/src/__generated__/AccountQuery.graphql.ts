/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Account_viewer$ref } from "./Account_viewer.graphql";
export type AccountQueryVariables = {};
export type AccountQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly " $fragmentRefs": Account_viewer$ref;
    };
};
export type AccountQuery = {
    readonly response: AccountQueryResponse;
    readonly variables: AccountQueryVariables;
};



/*
query AccountQuery {
  viewer {
    id
    ...Account_viewer
  }
}

fragment Account_viewer on Viewer {
  id
  me {
    id
    email
    user {
      id
      username
    }
  }
  ...AppHeader_viewer
}

fragment AppHeader_viewer on Viewer {
  id
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "AccountQuery",
  "id": null,
  "text": "query AccountQuery {\n  viewer {\n    id\n    ...Account_viewer\n  }\n}\n\nfragment Account_viewer on Viewer {\n  id\n  me {\n    id\n    email\n    user {\n      id\n      username\n    }\n  }\n  ...AppHeader_viewer\n}\n\nfragment AppHeader_viewer on Viewer {\n  id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "AccountQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
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
          v0,
          {
            "kind": "FragmentSpread",
            "name": "Account_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AccountQuery",
    "argumentDefinitions": [],
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
          v0,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "me",
            "storageKey": null,
            "args": null,
            "concreteType": "Account",
            "plural": false,
            "selections": [
              v0,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "email",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "user",
                "storageKey": null,
                "args": null,
                "concreteType": "User",
                "plural": false,
                "selections": [
                  v0,
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "username",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'c1d9e07f145a1d77c6ff3323020d892b';
export default node;
