interface IConnection {
  edges: IEdgeArray;
}

type IEdgeArray = ReadonlyArray<IEdge | null> | null;

interface IEdge {
  node: INode | null;
}

interface INode {}

function notNull<T>(x: T | null): x is T {
  return !!x;
}

export function connectionToArray<T extends IConnection>(connection: T) {
  type T1 = NonNullable<T['edges']>;
  type T2 = T1 extends IEdgeArray ? T1 : never;
  type T3 = NonNullable<T2[number]>;
  type T4 = T3 extends IEdge ? T3['node'] : never;
  type TNode = NonNullable<T4>;
  const { edges } = connection;
  if (!edges) return [] as TNode[];
  return edges.map(x => x && x.node).filter(notNull) as TNode[];
}
