/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent?: Parent,
  args?: Args,
  context?: Context,
  info?: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent?: P,
    args?: Args,
    context?: Context,
    info?: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent?: P,
    args?: Args,
    context?: Context,
    info?: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

/** An object with an ID */
export interface Node {
  id: string /** The id of the object. */;
}

export interface Query {
  node?: Node | null /** Fetches an object given its ID */;
  viewer: Viewer;
}

export interface Viewer extends Node {
  id: string;
  me?: Account | null;
  name?: string | null;
  email?: string | null;
  project?: Project | null;
  myProjects: ProjectConnection;
  otherProjects: ProjectConnection;
}

export interface Account extends Node {
  id: string /** The ID of an object */;
  extid: string;
  name?: string | null;
  email?: string | null;
  user?: User | null;
}

export interface User extends Node {
  id: string /** The ID of an object */;
  name?: string | null;
  about?: string | null;
  username?: string | null;
}

export interface Project extends Node {
  id: string /** The ID of an object */;
  name?: string | null;
}
/** A connection to a list of items. */
export interface ProjectConnection {
  pageInfo: PageInfo /** Information to aid in pagination. */;
  edges?: (ProjectEdge | null)[] | null /** A list of edges. */;
  totalCount: number;
}
/** Information about pagination in a connection. */
export interface PageInfo {
  hasNextPage: boolean /** When paginating forwards, are there more items? */;
  hasPreviousPage: boolean /** When paginating backwards, are there more items? */;
  startCursor?:
    | string
    | null /** When paginating backwards, the cursor to continue. */;
  endCursor?:
    | string
    | null /** When paginating forwards, the cursor to continue. */;
}
/** An edge in a connection. */
export interface ProjectEdge {
  node?: Project | null /** The item at the end of the edge */;
  cursor: string /** A cursor for use in pagination */;
}

export interface Mutation {
  createProject?: CreateProjectPayload | null;
  loginWithToken?: LoginWithTokenPayload | null;
  logout?: LogoutPayload | null;
  requestCode?: RequestCodePayload | null;
  requestToken?: RequestTokenPayload | null;
}

export interface CreateProjectPayload {
  viewer: Viewer;
  project?: Project | null;
  errors?: string | null;
  clientMutationId?: string | null;
}

export interface LoginWithTokenPayload {
  jwt?: string | null;
  viewer: Viewer;
  errors?: string | null;
  clientMutationId?: string | null;
}

export interface LogoutPayload {
  viewer: Viewer;
  clientMutationId?: string | null;
}

export interface RequestCodePayload {
  code_token?: string | null;
  errors?: string | null;
  clientMutationId?: string | null;
}

export interface RequestTokenPayload {
  auth_token?: string | null;
  errors?: string | null;
  clientMutationId?: string | null;
}

export interface CreateProjectInput {
  name: string;
  clientMutationId?: string | null;
}

export interface LoginWithTokenInput {
  auth_token: string;
  clientMutationId?: string | null;
}

export interface LogoutInput {
  clientMutationId?: string | null;
}

export interface RequestCodeInput {
  email?: string | null;
  clientMutationId?: string | null;
}

export interface RequestTokenInput {
  code_token?: string | null;
  code?: string | null;
  clientMutationId?: string | null;
}
export interface NodeQueryArgs {
  id: string /** The ID of an object */;
}
export interface ProjectViewerArgs {
  id: string;
}
export interface MyProjectsViewerArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface OtherProjectsViewerArgs {
  after?: string | null;
  first?: number | null;
  before?: string | null;
  last?: number | null;
}
export interface CreateProjectMutationArgs {
  input: CreateProjectInput;
}
export interface LoginWithTokenMutationArgs {
  input: LoginWithTokenInput;
}
export interface LogoutMutationArgs {
  input: LogoutInput;
}
export interface RequestCodeMutationArgs {
  input: RequestCodeInput;
}
export interface RequestTokenMutationArgs {
  input: RequestTokenInput;
}

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    node?: NodeResolver<
      Node | null,
      any,
      Context
    > /** Fetches an object given its ID */;
    viewer?: ViewerResolver<Viewer, any, Context>;
  }

  export type NodeResolver<
    R = Node | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, NodeArgs>;
  export interface NodeArgs {
    id: string /** The ID of an object */;
  }

  export type ViewerResolver<
    R = Viewer,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ViewerResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    me?: MeResolver<Account | null, any, Context>;
    name?: NameResolver<string | null, any, Context>;
    email?: EmailResolver<string | null, any, Context>;
    project?: ProjectResolver<Project | null, any, Context>;
    myProjects?: MyProjectsResolver<ProjectConnection, any, Context>;
    otherProjects?: OtherProjectsResolver<ProjectConnection, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type MeResolver<
    R = Account | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ProjectResolver<
    R = Project | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ProjectArgs>;
  export interface ProjectArgs {
    id: string;
  }

  export type MyProjectsResolver<
    R = ProjectConnection,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, MyProjectsArgs>;
  export interface MyProjectsArgs {
    after?: string | null;
    first?: number | null;
    before?: string | null;
    last?: number | null;
  }

  export type OtherProjectsResolver<
    R = ProjectConnection,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, OtherProjectsArgs>;
  export interface OtherProjectsArgs {
    after?: string | null;
    first?: number | null;
    before?: string | null;
    last?: number | null;
  }
}

export namespace AccountResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context> /** The ID of an object */;
    extid?: ExtidResolver<string, any, Context>;
    name?: NameResolver<string | null, any, Context>;
    email?: EmailResolver<string | null, any, Context>;
    user?: UserResolver<User | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ExtidResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = User | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace UserResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context> /** The ID of an object */;
    name?: NameResolver<string | null, any, Context>;
    about?: AboutResolver<string | null, any, Context>;
    username?: UsernameResolver<string | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type AboutResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type UsernameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ProjectResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context> /** The ID of an object */;
    name?: NameResolver<string | null, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}
/** A connection to a list of items. */
export namespace ProjectConnectionResolvers {
  export interface Resolvers<Context = any> {
    pageInfo?: PageInfoResolver<
      PageInfo,
      any,
      Context
    > /** Information to aid in pagination. */;
    edges?: EdgesResolver<
      (ProjectEdge | null)[] | null,
      any,
      Context
    > /** A list of edges. */;
    totalCount?: TotalCountResolver<number, any, Context>;
  }

  export type PageInfoResolver<
    R = PageInfo,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EdgesResolver<
    R = (ProjectEdge | null)[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type TotalCountResolver<
    R = number,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}
/** Information about pagination in a connection. */
export namespace PageInfoResolvers {
  export interface Resolvers<Context = any> {
    hasNextPage?: HasNextPageResolver<
      boolean,
      any,
      Context
    > /** When paginating forwards, are there more items? */;
    hasPreviousPage?: HasPreviousPageResolver<
      boolean,
      any,
      Context
    > /** When paginating backwards, are there more items? */;
    startCursor?: StartCursorResolver<
      string | null,
      any,
      Context
    > /** When paginating backwards, the cursor to continue. */;
    endCursor?: EndCursorResolver<
      string | null,
      any,
      Context
    > /** When paginating forwards, the cursor to continue. */;
  }

  export type HasNextPageResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type HasPreviousPageResolver<
    R = boolean,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type StartCursorResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type EndCursorResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}
/** An edge in a connection. */
export namespace ProjectEdgeResolvers {
  export interface Resolvers<Context = any> {
    node?: NodeResolver<
      Project | null,
      any,
      Context
    > /** The item at the end of the edge */;
    cursor?: CursorResolver<
      string,
      any,
      Context
    > /** A cursor for use in pagination */;
  }

  export type NodeResolver<
    R = Project | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type CursorResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = any> {
    createProject?: CreateProjectResolver<
      CreateProjectPayload | null,
      any,
      Context
    >;
    loginWithToken?: LoginWithTokenResolver<
      LoginWithTokenPayload | null,
      any,
      Context
    >;
    logout?: LogoutResolver<LogoutPayload | null, any, Context>;
    requestCode?: RequestCodeResolver<RequestCodePayload | null, any, Context>;
    requestToken?: RequestTokenResolver<
      RequestTokenPayload | null,
      any,
      Context
    >;
  }

  export type CreateProjectResolver<
    R = CreateProjectPayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, CreateProjectArgs>;
  export interface CreateProjectArgs {
    input: CreateProjectInput;
  }

  export type LoginWithTokenResolver<
    R = LoginWithTokenPayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, LoginWithTokenArgs>;
  export interface LoginWithTokenArgs {
    input: LoginWithTokenInput;
  }

  export type LogoutResolver<
    R = LogoutPayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, LogoutArgs>;
  export interface LogoutArgs {
    input: LogoutInput;
  }

  export type RequestCodeResolver<
    R = RequestCodePayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RequestCodeArgs>;
  export interface RequestCodeArgs {
    input: RequestCodeInput;
  }

  export type RequestTokenResolver<
    R = RequestTokenPayload | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RequestTokenArgs>;
  export interface RequestTokenArgs {
    input: RequestTokenInput;
  }
}

export namespace CreateProjectPayloadResolvers {
  export interface Resolvers<Context = any> {
    viewer?: ViewerResolver<Viewer, any, Context>;
    project?: ProjectResolver<Project | null, any, Context>;
    errors?: ErrorsResolver<string | null, any, Context>;
    clientMutationId?: ClientMutationIdResolver<string | null, any, Context>;
  }

  export type ViewerResolver<
    R = Viewer,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ProjectResolver<
    R = Project | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ErrorsResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ClientMutationIdResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace LoginWithTokenPayloadResolvers {
  export interface Resolvers<Context = any> {
    jwt?: JwtResolver<string | null, any, Context>;
    viewer?: ViewerResolver<Viewer, any, Context>;
    errors?: ErrorsResolver<string | null, any, Context>;
    clientMutationId?: ClientMutationIdResolver<string | null, any, Context>;
  }

  export type JwtResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ViewerResolver<
    R = Viewer,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ErrorsResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ClientMutationIdResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace LogoutPayloadResolvers {
  export interface Resolvers<Context = any> {
    viewer?: ViewerResolver<Viewer, any, Context>;
    clientMutationId?: ClientMutationIdResolver<string | null, any, Context>;
  }

  export type ViewerResolver<
    R = Viewer,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ClientMutationIdResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace RequestCodePayloadResolvers {
  export interface Resolvers<Context = any> {
    code_token?: CodeTokenResolver<string | null, any, Context>;
    errors?: ErrorsResolver<string | null, any, Context>;
    clientMutationId?: ClientMutationIdResolver<string | null, any, Context>;
  }

  export type CodeTokenResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ErrorsResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ClientMutationIdResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace RequestTokenPayloadResolvers {
  export interface Resolvers<Context = any> {
    auth_token?: AuthTokenResolver<string | null, any, Context>;
    errors?: ErrorsResolver<string | null, any, Context>;
    clientMutationId?: ClientMutationIdResolver<string | null, any, Context>;
  }

  export type AuthTokenResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ErrorsResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type ClientMutationIdResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}
