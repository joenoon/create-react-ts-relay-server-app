import React from 'react';
import { Text, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { Link, Redirect } from 'react-router-dom';
import { createProject } from '../mutations/CreateProjectMutation';
import { Dashboard_viewer } from '../__generated__/Dashboard_viewer.graphql';
import { AppHeaderContainer } from './AppHeader';
import { Button } from './Button';
import { ANONYMOUS_VIEWER_ID, connectionToArray, Decorated, PageRenderer } from './common';

interface Props {
  viewer: Dashboard_viewer;
}

class DashboardComponentBase extends Decorated.ReactComponent<Props>('relay', 'history', 'store', 'observer') {
  createDummyProject = async () => {
    try {
      const { response, errors } = await createProject(this.props.relay.environment, {
        name: `Test Project ${new Date().getTime()}`,
      });

      console.log('response', response, 'errors', errors);
    } catch (err) {
      alert(`Something went wrong.  Please check your entries and try again.`);
      console.log('err', err);
    }
  };

  render() {
    const { props } = this;
    const { viewer } = props;

    if (viewer.id === ANONYMOUS_VIEWER_ID) {
      return <Redirect to="/" />;
    }

    const myProjects = connectionToArray(viewer.myProjects);
    const otherProjects = connectionToArray(viewer.otherProjects);

    return (
      <View style={{ flex: 1 }}>
        <AppHeaderContainer viewer={viewer} />
        <View>
          <Text>Dashboard</Text>
          <View style={{ alignItems: 'flex-start' }}>
            <Button onPress={this.createDummyProject}>Create Test Project</Button>
          </View>
          <Text>My Projects</Text>
          {myProjects.map(x => (
            <View key={x.id}>
              <Link to={`/projects/${x.id}`}>
                <Text>
                  {x.id} - {x.name}
                </Text>
              </Link>
            </View>
          ))}
          <Text>Projects Shared With Me</Text>
          {otherProjects.map(x => (
            <View key={x.id}>
              <Text>
                {x.id} - {x.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const DashboardComponent = Decorated.GetComponent(DashboardComponentBase);

export const DashboardContainer = createFragmentContainer(
  DashboardComponent,
  graphql`
    fragment Dashboard_viewer on Viewer {
      id
      ...AppHeader_viewer
      myProjects {
        edges {
          node {
            id
            name
          }
        }
      }
      otherProjects {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `
);

class DashboardPageBase extends Decorated.ReactComponent('store', 'observer') {
  render() {
    return (
      <PageRenderer
        environment={this.props.store.relayEnvironment}
        query={graphql`
          query DashboardQuery {
            viewer {
              id
              ...Dashboard_viewer
            }
          }
        `}
        variables={{}}
        Container={DashboardContainer}
      />
    );
  }
}

export const DashboardPage = Decorated.GetComponent(DashboardPageBase);
