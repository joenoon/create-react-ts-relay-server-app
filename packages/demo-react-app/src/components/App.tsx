import { Provider as MobxProvider } from 'mobx-react';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { createRelayEnvironment } from '../relayEnvironment';
import { getClientStore, Store } from '../store';
import { AccountPage } from './Account';
import { AccountPanel } from './AccountPanel';
import { DashboardPage } from './Dashboard';
import { EditProfilePage } from './EditProfile';
import { FullContainer } from './FullContainer';
import { HomePage } from './Home';
import { ProjectPage } from './Project';
import { Spinner } from './Spinner';
import {GRAPHQL_AUTH_TOKEN} from './common';

export class AppComponent extends React.Component<{}> {
  store: Store;
  constructor(props: any) {
    super(props);
    this.store = getClientStore();
    this.store.relayEnvironment = createRelayEnvironment(GRAPHQL_AUTH_TOKEN, 'http://localhost:3010/graphql');
  }

  render() {
    const { store } = this;
    return (
      <MobxProvider store={store}>
        <BrowserRouter>
          <FullContainer key={'fixme'}>
            <Switch>
              <Route exact path="/projects" component={DashboardPage} />
              <Route exact path="/projects/:project_id" component={ProjectPage} />
              <Route exact path="/account" component={AccountPage} />
              <Route exact path="/edit-profile" component={EditProfilePage} />
              <Route exact path="/" component={HomePage} />
              <Redirect to="/" />
            </Switch>
            <AccountPanel />
            {store.spinners.size > 0 ? <Spinner /> : null}
          </FullContainer>
        </BrowserRouter>
      </MobxProvider>
    );
  }
}
