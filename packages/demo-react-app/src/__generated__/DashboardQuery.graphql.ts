/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { Dashboard_viewer$ref } from "./Dashboard_viewer.graphql";
export type DashboardQueryVariables = {};
export type DashboardQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly " $fragmentRefs": Dashboard_viewer$ref;
    };
};
export type DashboardQuery = {
    readonly response: DashboardQueryResponse;
    readonly variables: DashboardQueryVariables;
};



/*
query DashboardQuery {
  viewer {
    id
    ...Dashboard_viewer
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
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = [
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
          v0,
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
  "operationKind": "query",
  "name": "DashboardQuery",
  "id": null,
  "text": "query DashboardQuery {\n  viewer {\n    id\n    ...Dashboard_viewer\n  }\n}\n\nfragment Dashboard_viewer on Viewer {\n  id\n  ...AppHeader_viewer\n  myProjects {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  otherProjects {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n\nfragment AppHeader_viewer on Viewer {\n  id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "DashboardQuery",
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
            "name": "Dashboard_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "DashboardQuery",
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
            "name": "myProjects",
            "storageKey": null,
            "args": null,
            "concreteType": "ProjectConnection",
            "plural": false,
            "selections": v1
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "otherProjects",
            "storageKey": null,
            "args": null,
            "concreteType": "ProjectConnection",
            "plural": false,
            "selections": v1
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '473bb8c836be460d4cfdb3bb30f59381';
export default node;
