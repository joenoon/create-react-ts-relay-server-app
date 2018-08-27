/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Dashboard_viewer$ref } from "./Dashboard_viewer.graphql";
export type CreateProjectInput = {
    readonly name: string;
    readonly clientMutationId?: string | null;
};
export type CreateProjectMutationVariables = {
    readonly input: CreateProjectInput;
};
export type CreateProjectMutationResponse = {
    readonly createProject: ({
        readonly errors: string | null;
        readonly viewer: {
            readonly id: string;
            readonly " $fragmentRefs": Dashboard_viewer$ref;
        };
    }) | null;
};
export type CreateProjectMutation = {
    readonly response: CreateProjectMutationResponse;
    readonly variables: CreateProjectMutationVariables;
};



/*
mutation CreateProjectMutation(
  $input: CreateProjectInput!
) {
  createProject(input: $input) {
    errors
    viewer {
      id
      ...Dashboard_viewer
    }
  }
}

fragment Dashboard_viewer on Viewer {
  id
  ...AppHeader_viewer
  myProjects {
    edges {
      node {
        id
        name
      }
    }
  }
  otherProjects {
    edges {
      node {
        id
        name
      }
    }
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
    "name": "input",
    "type": "CreateProjectInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "CreateProjectInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "errors",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "edges",
    "storageKey": null,
    "args": null,
    "concreteType": "ProjectEdge",
    "plural": true,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": null,
        "concreteType": "Project",
        "plural": false,
        "selections": [
          v3,
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
];
return {
  "kind": "Request",
  "operationKind": "mutation",
  "name": "CreateProjectMutation",
  "id": null,
  "text": "mutation CreateProjectMutation(\n  $input: CreateProjectInput!\n) {\n  createProject(input: $input) {\n    errors\n    viewer {\n      id\n      ...Dashboard_viewer\n    }\n  }\n}\n\nfragment Dashboard_viewer on Viewer {\n  id\n  ...AppHeader_viewer\n  myProjects {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  otherProjects {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n\nfragment AppHeader_viewer on Viewer {\n  id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "CreateProjectMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createProject",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateProjectPayload",
        "plural": false,
        "selections": [
          v2,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "viewer",
            "storageKey": null,
            "args": null,
            "concreteType": "Viewer",
            "plural": false,
            "selections": [
              v3,
              {
                "kind": "FragmentSpread",
                "name": "Dashboard_viewer",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateProjectMutation",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "createProject",
        "storageKey": null,
        "args": v1,
        "concreteType": "CreateProjectPayload",
        "plural": false,
        "selections": [
          v2,
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "viewer",
            "storageKey": null,
            "args": null,
            "concreteType": "Viewer",
            "plural": false,
            "selections": [
              v3,
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "myProjects",
                "storageKey": null,
                "args": null,
                "concreteType": "ProjectConnection",
                "plural": false,
                "selections": v4
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "otherProjects",
                "storageKey": null,
                "args": null,
                "concreteType": "ProjectConnection",
                "plural": false,
                "selections": v4
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '3ae6e4ae899dea739aa3616b6b9ea2ab';
export default node;
