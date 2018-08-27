/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Project_viewer$ref } from "./Project_viewer.graphql";
export type ProjectQueryVariables = {
    readonly project_id: string;
};
export type ProjectQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly " $fragmentRefs": Project_viewer$ref;
    };
};
export type ProjectQuery = {
    readonly response: ProjectQueryResponse;
    readonly variables: ProjectQueryVariables;
};



/*
query ProjectQuery(
  $project_id: String!
) {
  viewer {
    id
    ...Project_viewer
  }
}

fragment Project_viewer on Viewer {
  id
  ...AppHeader_viewer
  project(id: $project_id) {
    id
    name
  }
}

fragment AppHeader_viewer on Viewer {
  id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "project_id",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "ProjectQuery",
  "id": null,
  "text": "query ProjectQuery(\n  $project_id: String!\n) {\n  viewer {\n    id\n    ...Project_viewer\n  }\n}\n\nfragment Project_viewer on Viewer {\n  id\n  ...AppHeader_viewer\n  project(id: $project_id) {\n    id\n    name\n  }\n}\n\nfragment AppHeader_viewer on Viewer {\n  id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "ProjectQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
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
          v1,
          {
            "kind": "FragmentSpread",
            "name": "Project_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ProjectQuery",
    "argumentDefinitions": v0,
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
          v1,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "project",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "project_id",
                "type": "String!"
              }
            ],
            "concreteType": "Project",
            "plural": false,
            "selections": [
              v1,
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '4f1f97ccfd5ec77646c8598cfde51e33';
export default node;
