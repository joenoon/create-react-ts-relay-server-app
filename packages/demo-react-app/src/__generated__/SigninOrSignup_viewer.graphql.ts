/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _SigninOrSignup_viewer$ref: unique symbol;
export type SigninOrSignup_viewer$ref = typeof _SigninOrSignup_viewer$ref;
export type SigninOrSignup_viewer = {
    readonly id: string;
    readonly " $refType": SigninOrSignup_viewer$ref;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "SigninOrSignup_viewer",
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
(node as any).hash = '8fa7035332b8d39894a31fab18c0d691';
export default node;
