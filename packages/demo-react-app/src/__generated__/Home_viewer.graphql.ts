/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { SigninOrSignup_viewer$ref } from "./SigninOrSignup_viewer.graphql";
declare const _Home_viewer$ref: unique symbol;
export type Home_viewer$ref = typeof _Home_viewer$ref;
export type Home_viewer = {
    readonly id: string;
    readonly " $fragmentRefs": SigninOrSignup_viewer$ref;
    readonly " $refType": Home_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "Home_viewer",
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
    },
    {
      "kind": "FragmentSpread",
      "name": "SigninOrSignup_viewer",
      "args": null
    }
  ]
};
(node as any).hash = 'e2e519f3a23dafbee6f38b7c56dc394f';
export default node;
