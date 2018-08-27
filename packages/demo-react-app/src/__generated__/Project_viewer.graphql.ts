/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { AppHeader_viewer$ref } from "./AppHeader_viewer.graphql";
declare const _Project_viewer$ref: unique symbol;
export type Project_viewer$ref = typeof _Project_viewer$ref;
export type Project_viewer = {
    readonly id: string;
    readonly project: ({
        readonly id: string;
        readonly name: string | null;
    }) | null;
    readonly " $fragmentRefs": AppHeader_viewer$ref;
    readonly " $refType": Project_viewer$ref;
};



const node: ConcreteFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "Project_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "project_id",
      "type": "String!"
    }
  ],
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
};
})();
(node as any).hash = 'b333fe9ee8ba36b9603ed9aced800c30';
export default node;
