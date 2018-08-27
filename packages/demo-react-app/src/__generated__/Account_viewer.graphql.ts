/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
import { AppHeader_viewer$ref } from "./AppHeader_viewer.graphql";
declare const _Account_viewer$ref: unique symbol;
export type Account_viewer$ref = typeof _Account_viewer$ref;
export type Account_viewer = {
    readonly id: string;
    readonly me: ({
        readonly id: string;
        readonly email: string | null;
        readonly user: ({
            readonly id: string;
            readonly username: string | null;
        }) | null;
    }) | null;
    readonly " $fragmentRefs": AppHeader_viewer$ref;
    readonly " $refType": Account_viewer$ref;
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
  "name": "Account_viewer",
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
        v0,
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "email",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "user",
          "storageKey": null,
          "args": null,
          "concreteType": "User",
          "plural": false,
          "selections": [
            v0,
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "username",
              "args": null,
              "storageKey": null
            }
          ]
        }
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
(node as any).hash = '688c23a137ee92515331e49cb3bdbd38';
export default node;
