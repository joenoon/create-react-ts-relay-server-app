import * as React from 'react';
import { QueryRenderer } from 'react-relay';
import * as RelayRuntimeTypes from 'relay-runtime';

declare module 'react-relay' {
  export interface QueryRendererProps {
    dataFrom: string;
  }
}

interface Props {
  render?: (props: any) => any;
  renderError?: (error: any) => any;
  Container?: any;
  environment: RelayRuntimeTypes.Environment | null;
  query?: RelayRuntimeTypes.GraphQLTaggedNode | null;
  variables: RelayRuntimeTypes.Variables;
  dataFrom?: string;
}

export class PageRenderer extends React.Component<Props> {
  render() {
    const { dataFrom, environment, query, variables, renderError, render, Container } = this.props;
    if (!environment) {
      throw 'FATAL: MISSING RELAY ENV';
    }
    return (
      <QueryRenderer
        dataFrom={dataFrom || 'STORE_THEN_NETWORK'}
        environment={environment}
        query={query}
        variables={variables}
        render={x => {
          const { error, props } = x;
          if (error) {
            console.error(error);
            if (renderError) return renderError(error);
            return null;
          } else if (props) {
            if (Container) {
              return <Container {...props} />;
            } else if (render) {
              return render(props);
            } else {
              throw new Error('No container or render given');
            }
          }
          return null;
        }}
      />
    );
  }
}
