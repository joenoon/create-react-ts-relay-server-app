/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { AppHeader_viewer$ref } from "./AppHeader_viewer.graphql";
declare const _Dashboard_viewer$ref: unique symbol;
export type Dashboard_viewer$ref = typeof _Dashboard_viewer$ref;
export type Dashboard_viewer = {
    readonly id: string;
    readonly myProjects: {
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly id: string;
                readonly name: string | null;
            }) | null;
        }) | null> | null;
    };
    readonly otherProjects: {
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly id: string;
                readonly name: string | null;
            }) | null;
        }) | null> | null;
    };
    readonly " $fragmentRefs": AppHeader_viewer$ref;
    readonly " $refType": Dashboard_viewer$ref;
};



const node: ConcreteFragment = (function(){
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
  "kind": "Fragment",
  "name": "Dashboard_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    v0,
    {
      "kind": "FragmentSpread",
      "name": "AppHeader_viewer",
      "args": null
    },
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
};
})();
(node as any).hash = '147edd5ce8876d6d150618ee88d74e20';
export default node;
