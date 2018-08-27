import { action, observable, mobxDecorate } from './components/common';
import { Environment } from 'relay-runtime';
import { logout } from './mutations/LogoutMutation';

const __SERVER__ = !process['browser'];

export class Store {
  jwt: string | null = null;
  relayEnvironment: Environment | null = null;
  spinners = observable.map({});
  panel = false;

  addSpinner = (name: string) => {
    this.spinners.set(name, true);
  };

  removeSpinner = (name: string) => {
    this.spinners.delete(name);
  };

  logout = async () => {
    this.addSpinner('logout');

    try {
      const { response, errors } = await logout(this.relayEnvironment);
      console.log('response', response, 'errors', errors);
      window.location.href = '/';
    } catch (err) {
      alert(`Something went wrong.  Please check your entries and try again.`);
      console.log('err', err);
    }
  };

  togglePanel = () => {
    this.panel = !this.panel;
  };
}

mobxDecorate(Store, {
  jwt: observable,
  relayEnvironment: observable,
  spinners: observable,
  panel: observable,
  addSpinner: action,
  removeSpinner: action,
});

export function getClientStore(): Store {
  if (__SERVER__) throw new Error('getClientStore called from server');
  return new Store();
}

let store: Store;

export function newServerStore(): Store {
  if (!__SERVER__) throw new Error('getServerStore called from client');
  if (store) return store;
  store = new Store();
  return store;
}
