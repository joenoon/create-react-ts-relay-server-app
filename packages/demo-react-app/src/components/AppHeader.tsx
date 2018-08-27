import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { AppHeader_viewer } from '../__generated__/AppHeader_viewer.graphql';
import { ANONYMOUS_VIEWER_ID, COLORS, Decorated } from './common';

interface Props {
  viewer: AppHeader_viewer;
}

class AppHeaderBase extends Decorated.ReactComponent<Props>('relay', 'history', 'store', 'observer') {
  constructor(props, context) {
    super(props, context);
    if (props.viewer.id === ANONYMOUS_VIEWER_ID) {
      this.props.history.push('/');
    }
  }

  togglePanel = () => {
    console.log('togglePanel');
    this.props.store.togglePanel();
  };

  render() {
    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: 20, height: 90, backgroundColor: COLORS.COLOR1, alignItems: 'center' }}>
        <View>
          <TouchableOpacity onPress={() => this.props.history.push('/')}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 30, color: COLORS.WHITE }}>MyApp</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }} />
        <View>
          <TouchableOpacity onPress={this.togglePanel}>
            <Text style={{ color: COLORS.WHITE, fontSize: 20 }}>My Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const AppHeader = Decorated.GetComponent(AppHeaderBase);

export const AppHeaderContainer = createFragmentContainer(
  AppHeader,
  graphql`
    fragment AppHeader_viewer on Viewer {
      id
    }
  `
);
