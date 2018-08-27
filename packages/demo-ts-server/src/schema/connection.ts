import { GraphQLInt, GraphQLNonNull } from 'graphql';
import { connectionDefinitions as orig_connectionDefinitions, getOffsetWithDefault, offsetToCursor } from 'graphql-relay';

export function appConnectionDefinitions(config) {
  let connectionFields = config.connectionFields || {};
  connectionFields.totalCount = {
    type: new GraphQLNonNull(GraphQLInt),
  };
  return orig_connectionDefinitions({ ...config, connectionFields });
}

type AppConnectionForArgsFnArgs = { offset: number; limit: number };
type AppConnectionForArgsFnResult = { rows: any[]; count: number };
type AppConnectionForArgsFn = (args: AppConnectionForArgsFnArgs) => AppConnectionForArgsFnResult | Promise<AppConnectionForArgsFnResult>;
type AppConnectionForArgsArgs = { before?: string; after?: string; first?: number; last?: number };

// fn - a function that receives {offset,limit} and should return {rows,count}
// args - passthrough
export async function appConnectionForArgs(fn: AppConnectionForArgsFn, args: AppConnectionForArgsArgs = {}) {
  const { before, after, first, last } = args;
  let offset = 0;
  let limit = first || last || 10;

  if (before && after) {
    throw new Error('Combining `before` and `after` is not supported');
  }

  if (after) {
    offset = (getOffsetWithDefault(after) || 0) + 1;
    limit = first || limit;
  } else if (before) {
    limit = last || limit;
    offset = Math.max(0, (getOffsetWithDefault(before) || 0) - limit) + 1;
  }

  if (limit > 100) {
    limit = 100;
  }

  const { rows, count } = await fn({ offset, limit });

  const edges = rows.map((value, index) => {
    return {
      cursor: offsetToCursor(offset + index),
      node: value,
    };
  });

  const firstEdge = edges[0];
  const lastEdge = edges[edges.length - 1];
  return {
    edges,
    totalCount: count,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : null,
      endCursor: lastEdge ? lastEdge.cursor : null,
      hasPreviousPage: offset > 0 && count > 0,
      hasNextPage: offset + limit < count,
    },
  };
}

export function appEmptyConnection() {
  return appConnectionForArgs(() => ({ rows: [], count: 0 }));
}
