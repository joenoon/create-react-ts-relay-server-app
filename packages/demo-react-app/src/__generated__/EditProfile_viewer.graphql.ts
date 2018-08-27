/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { AppHeader_viewer$ref } from "./AppHeader_viewer.graphql";
declare const _EditProfile_viewer$ref: unique symbol;
export type EditProfile_viewer$ref = typeof _EditProfile_viewer$ref;
export type EditProfile_viewer = {
    readonly id: string;
    readonly me: ({
        readonly id: string;
    }) | null;
    readonly " $fragmentRefs": AppHeader_viewer$ref;
    readonly " $refType": EditProfile_viewer$ref;
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
  "name": "EditProfile_viewer",
  "type": "Viewer",
  "metadata": null,
  "argumentDefinitions": [],
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
    },
    {
      "kind": "FragmentSpread",
      "name": "AppHeader_viewer",
      "args": null
    }
  ]
};
})();
(node as any).hash = '4ea73718c3eb5238f7a6cb6f3f7f84a1';
export default node;
