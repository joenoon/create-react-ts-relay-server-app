import React from 'react';
import { Text, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { Redirect } from 'react-router-dom';
import { EditProfile_viewer } from '../__generated__/EditProfile_viewer.graphql';
import { AppHeaderContainer } from './AppHeader';
import { Decorated, PageRenderer } from './common';

interface Props {
  viewer: EditProfile_viewer;
}

class EditProfileComponentBase extends Decorated.ReactComponent<Props>('relay', 'history', 'store', 'observer') {
  render() {
    const { viewer } = this.props;
    if (!viewer.me) return <Redirect to="/" />;
    return (
      <View style={{ flex: 1 }}>
        <AppHeaderContainer viewer={viewer} />
        <View>
          <Text>EditProfile</Text>
        </View>
      </View>
    );
  }
}

const EditProfileComponent = Decorated.GetComponent(EditProfileComponentBase);

export const EditProfileContainer = createFragmentContainer(
  EditProfileComponent,
  graphql`
    fragment EditProfile_viewer on Viewer {
      id
      me {
        id
      }
      ...AppHeader_viewer
    }
  `
);

class EditProfilePageBase extends Decorated.ReactComponent('store', 'observer') {
  render() {
    return (
      <PageRenderer
        environment={this.props.store.relayEnvironment}
        query={graphql`
          query EditProfileQuery {
            viewer {
              id
              ...EditProfile_viewer
            }
          }
        `}
        variables={{}}
        Container={EditProfileContainer}
      />
    );
  }
}

export const EditProfilePage = Decorated.GetComponent(EditProfilePageBase);
