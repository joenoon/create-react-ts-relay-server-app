import { authMiddleware, RelayNetworkLayer, urlMiddleware } from 'react-relay-network-modern';
import { Environment, RecordSource, Store } from 'relay-runtime';

const __SERVER__ = !process['browser'];

export function createRelayEnvironment(auth_key, url): Environment {
  return new Environment({
    network: new RelayNetworkLayer([
      urlMiddleware({ url }),
      authMiddleware({
        allowEmptyToken: true,
        token: () => {
          return localStorage.getItem(auth_key) || null;
        },
        tokenRefreshPromise: req => {
          if (!__SERVER__) {
            console.log('[client.js] resolve token refresh', req);
            return null;
            // return fetch('/jwt/refresh')
            //   .then(res => res.json())
            //   .then(json => {
            //     const token = json.token;
            //     store.jwt = token;
            //     return token;
            //   })
            //   .catch(err => console.log('[client.js] ERROR can not refresh token', err));
          }
        },
      }),
    ]),
    store: new Store(new RecordSource()),
  });
}
