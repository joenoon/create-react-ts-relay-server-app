/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _AppHeader_viewer$ref: unique symbol;
export type AppHeader_viewer$ref = typeof _AppHeader_viewer$ref;
export type AppHeader_viewer = {
    readonly id: string;
    readonly " $refType": AppHeader_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "AppHeader_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'e7dc0326236eb89ae408322b4421e91e';
export default node;
