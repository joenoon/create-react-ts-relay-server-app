import React from 'react';
import { View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { Redirect } from 'react-router-dom';
import { Account_viewer } from '../__generated__/Account_viewer.graphql';
import { AppHeaderContainer } from './AppHeader';
import { Decorated, PageRenderer } from './common';
import { RowSelect } from './RowSelect';

interface Props {
  viewer: Account_viewer;
}

class AccountComponentBase extends Decorated.ReactComponent<Props>('relay', 'history', 'store', 'observer') {
  render() {
    const { viewer } = this.props;
    if (!viewer.me) return <Redirect to="/" />;
    const account = viewer.me;
    const user = viewer.me.user;
    if (!user) return <Redirect to="/" />;
    return (
      <View style={{ flex: 1 }}>
        <AppHeaderContainer viewer={viewer} />
        <View>
          <RowSelect title="Edit Profile" onPress={() => this.props.history.push('/edit-profile')} />
          <RowSelect
            title="Change Username"
            subtitle={(user.username && `@${user.username}`) || null}
            onPress={() => this.props.history.push('/edit-username')}
          />
          <RowSelect title="Change Email" subtitle={account.email} onPress={() => this.props.history.push('/edit-email')} />
        </View>
      </View>
    );
  }
}

const AccountComponent = Decorated.GetComponent(AccountComponentBase);

export const AccountContainer = createFragmentContainer(
  AccountComponent,
  graphql`
    fragment Account_viewer on Viewer {
      id
      me {
        id
        email
        user {
          id
          username
        }
      }
      ...AppHeader_viewer
    }
  `
);

class AccountPageBase extends Decorated.ReactComponent('store', 'observer') {
  render() {
    return (
      <PageRenderer
        environment={this.props.store.relayEnvironment}
        query={graphql`
          query AccountQuery {
            viewer {
              id
              ...Account_viewer
            }
          }
        `}
        variables={{}}
        Container={AccountContainer}
      />
    );
  }
}

export const AccountPage = Decorated.GetComponent(AccountPageBase);
