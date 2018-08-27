/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Home_viewer$ref } from "./Home_viewer.graphql";
export type HomeQueryVariables = {};
export type HomeQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly " $fragmentRefs": Home_viewer$ref;
    };
};
export type HomeQuery = {
    readonly response: HomeQueryResponse;
    readonly variables: HomeQueryVariables;
};



/*
query HomeQuery {
  viewer {
    id
    ...Home_viewer
  }
}

fragment Home_viewer on Viewer {
  id
  ...SigninOrSignup_viewer
}

fragment SigninOrSignup_viewer on Viewer {
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
  "name": "HomeQuery",
  "id": null,
  "text": "query HomeQuery {\n  viewer {\n    id\n    ...Home_viewer\n  }\n}\n\nfragment Home_viewer on Viewer {\n  id\n  ...SigninOrSignup_viewer\n}\n\nfragment SigninOrSignup_viewer on Viewer {\n  id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "HomeQuery",
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
            "name": "Home_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "HomeQuery",
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
          v0
        ]
      }
    ]
  }
};
})();
(node as any).hash = 'a34c222aaa1efa7baa03195d8b9847a1';
export default node;
