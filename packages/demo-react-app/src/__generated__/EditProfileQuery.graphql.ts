/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { EditProfile_viewer$ref } from "./EditProfile_viewer.graphql";
export type EditProfileQueryVariables = {};
export type EditProfileQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly " $fragmentRefs": EditProfile_viewer$ref;
    };
};
export type EditProfileQuery = {
    readonly response: EditProfileQueryResponse;
    readonly variables: EditProfileQueryVariables;
};



/*
query EditProfileQuery {
  viewer {
    id
    ...EditProfile_viewer
  }
}

fragment EditProfile_viewer on Viewer {
  id
  me {
    id
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
  "name": "EditProfileQuery",
  "id": null,
  "text": "query EditProfileQuery {\n  viewer {\n    id\n    ...EditProfile_viewer\n  }\n}\n\nfragment EditProfile_viewer on Viewer {\n  id\n  me {\n    id\n  }\n  ...AppHeader_viewer\n}\n\nfragment AppHeader_viewer on Viewer {\n  id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "EditProfileQuery",
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
            "name": "EditProfile_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "EditProfileQuery",
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
              v0
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '506d9c5dcbdad0581115666341355e5a';
export default node;
