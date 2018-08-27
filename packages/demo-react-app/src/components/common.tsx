import base64url from 'base64url';
import { History } from 'history';
import { action, decorate as mobxDecorate, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RelayProp } from 'react-relay';
import { withRouter } from 'react-router-dom';
import decorateFactory from '../core/decorateFactory';
import { Store } from '../store';

/**
 * Takes a type name and an ID specific to that type name, and returns a
 * "global ID" that is unique among all types.
 */
export function toGlobalId(type: string, id: string): string {
  return base64url.encode([type, id].join(':'));
}

export type HistoryProp = History;
interface WithHistoryProp {
  history: HistoryProp;
}

interface WithMatchProp {
  match: {
    params: {
      [key: string]: any;
    };
    [key: string]: any;
  };
}

export type StoreProp = Store;

interface WithStoreProp {
  store: StoreProp;
}

export { connectionToArray } from '../core/connectionToArray';
export { PageRenderer } from '../core/PageRenderer';
export { RelayProp };
export { React };
export { action };
export { inject, observer };
export { observable };
export { mobxDecorate };
export { withRouter };

export const GRAPHQL_AUTH_TOKEN = 'GRAPHQL_AUTH_TOKEN';

interface WithRelayProp {
  relay: RelayProp;
}

export const ANONYMOUS_VIEWER_ID = toGlobalId('Viewer', 'anonymous');

export const COLORS = {
  COLOR1: 'brown',
  COLOR2: 'darkred',
  COLOR3: 'blue',
  WHITE: '#fff',
  TEXT_INPUT_BORDER: '#ccc',
};

declare module 'react-native' {
  // error on string nodes in View (?)
  // export interface ViewProps {
  //   children?: JSX.Element | JSX.Element[];
  // }
  // dismiss warning
  export namespace AppRegistry {
    function getApplication(a1: any, a2: any): any;
  }
  export const CheckBox: any;
}

type AllInjectables = WithRelayProp & WithStoreProp & WithHistoryProp & WithMatchProp;

export const Decorated = decorateFactory({
  relay: null,
  match: null,
  store: inject('store'),
  history: withRouter,
  observer: observer,
})<AllInjectables>();
