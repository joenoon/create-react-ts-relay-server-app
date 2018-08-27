import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { Home_viewer } from '../__generated__/Home_viewer.graphql';
import { COLORS, Decorated, PageRenderer } from './common';
import { SigninOrSignupContainer } from './SigninOrSignup';

interface Props {
  viewer: Home_viewer;
}

class HomeComponentBase extends Decorated.ReactComponent<Props>('relay', 'history', 'store', 'observer') {
  render() {
    const { viewer } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flex: 2, backgroundColor: COLORS.COLOR1 }}>
              <View style={{ flexDirection: 'row', padding: 30, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 30, color: COLORS.WHITE }}>MyApp</Text>
                </View>
                <View style={{ flex: 1 }} />
                <View>
                  <Text style={{ fontSize: 20, color: COLORS.WHITE }}>Text 1</Text>
                </View>
                <View style={{ width: 30 }} />
                <View>
                  <Text style={{ fontSize: 20, color: COLORS.WHITE }}>Text 2</Text>
                </View>
                <View style={{ flex: 1 }} />
              </View>
              <View style={{ backgroundColor: COLORS.COLOR2, paddingHorizontal: 100, paddingVertical: 60 }}>
                <Text style={{ fontSize: 60, color: COLORS.WHITE }}>
                  {`XY2Cu sint lorem quo eu -\nhendrerit, elaboraret\n vel, ut vocibus`}
                </Text>
                <View style={{ height: 40 }} />
                <Text style={{ fontSize: 30, color: COLORS.WHITE }}>
                  {`Lorem ipsum dolor sit amet,\nveri detraxit dissentiet ex\nnam. His ne nibh facilisis.\nCu sint lorem quo eu.`}
                </Text>
              </View>
              <View style={{ height: 100 }} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ paddingHorizontal: 80, paddingVertical: 200 }}>
                <SigninOrSignupContainer viewer={viewer} />
              </View>
            </View>
          </View>
          {/* {Array(100)
            .fill(1)
            .map((x, i) => (
              <Text key={i}>
                Home? {i} {viewer.id}
              </Text>
            ))} */}
        </ScrollView>
      </View>
    );
  }
}

const HomeComponent = Decorated.GetComponent(HomeComponentBase);

export const HomeContainer = createFragmentContainer(
  HomeComponent,
  graphql`
    fragment Home_viewer on Viewer {
      id
      ...SigninOrSignup_viewer
    }
  `
);

class HomePageBase extends Decorated.ReactComponent('store', 'observer') {
  render() {
    return (
      <PageRenderer
        environment={this.props.store.relayEnvironment}
        query={graphql`
          query HomeQuery {
            viewer {
              id
              ...Home_viewer
            }
          }
        `}
        variables={{}}
        Container={HomeContainer}
      />
    );
  }
}

export const HomePage = Decorated.GetComponent(HomePageBase);
