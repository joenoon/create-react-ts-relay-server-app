import { nodeDefinitions } from 'graphql-relay';

export var { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    return;
  },
  obj => {
    return;
  }
);
