import React from 'react';
import { Text, View } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import { Link, Redirect } from 'react-router-dom';
import { Project_viewer } from '../__generated__/Project_viewer.graphql';
import { AppHeaderContainer } from './AppHeader';
import { ANONYMOUS_VIEWER_ID, Decorated, PageRenderer } from './common';

interface Props {
  viewer: Project_viewer;
}

class ProjectComponentBase extends Decorated.ReactComponent<Props>('relay', 'history', 'store', 'observer') {
  render() {
    const { props } = this;
    const { viewer } = props;

    if (viewer.id === ANONYMOUS_VIEWER_ID) {
      return <Redirect to="/" />;
    }

    const { project } = viewer;

    return (
      <View style={{ flex: 1 }}>
        <AppHeaderContainer viewer={viewer} />
        <View>
          <Link to={`/projects`}>
            <Text>Go back</Text>
          </Link>

          <Text>Project:</Text>
          <View>
            {project ? (
              <Text>
                {project.id} - {project.name}
              </Text>
            ) : (
              <Text>Project not found.</Text>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const ProjectComponent = Decorated.GetComponent(ProjectComponentBase);

export const ProjectContainer = createFragmentContainer(
  ProjectComponent,
  graphql`
    fragment Project_viewer on Viewer {
      id
      ...AppHeader_viewer
      project(id: $project_id) {
        id
        name
      }
    }
  `
);

class ProjectPageBase extends Decorated.ReactComponent('match', 'store', 'observer') {
  render() {
    const project_id = this.props.match.params.project_id;
    if (!project_id) return null;
    return (
      <PageRenderer
        environment={this.props.store.relayEnvironment}
        query={graphql`
          query ProjectQuery($project_id: String!) {
            viewer {
              id
              ...Project_viewer
            }
          }
        `}
        variables={{ project_id }}
        Container={ProjectContainer}
      />
    );
  }
}

export const ProjectPage = Decorated.GetComponent(ProjectPageBase);
