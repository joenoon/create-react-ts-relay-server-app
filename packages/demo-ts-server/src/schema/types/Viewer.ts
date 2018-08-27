import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import * as DB from '../../db';
import { Context } from '../../utils';
import { appConnectionForArgs, appEmptyConnection } from '../connection';
import { nodeInterface } from '../interface';
import { fromGlobalId, toGlobalId } from '../node';
import { Account } from './Account';
import { Project, ProjectConnection } from './Project';

export const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: async (_, args, { getUser }: Context) => {
        const user = await getUser();
        if (user && user.id) {
          return toGlobalId('Viewer', user.id);
        } else {
          return toGlobalId('Viewer', 'anonymous');
        }
      },
    },

    me: {
      type: Account,
      resolve: async (_, args, { extid }: Context) => {
        if (!extid) return;
        return await DB.User.findOne({
          where: {
            extid,
          },
        });
      },
    },

    name: {
      type: GraphQLString,
    },

    email: {
      type: GraphQLString,
      resolve: async (_, args, { extid }: Context) => extid,
    },

    project: {
      type: Project,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_, args) => DB.Project.findById(fromGlobalId(args.id).id),
    },

    myProjects: {
      type: new GraphQLNonNull(ProjectConnection),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context: Context) => {
        const user = await context.getUser();
        if (!user) return appEmptyConnection();

        return appConnectionForArgs(async ({ offset, limit }) => {
          const rows = await DB.Project.findAll({
            where: {
              user_id: user.id,
            },
            order: [['created_at', 'desc']],
          });
          const count = rows.length;
          return { rows, count };
        }, args);
      },
    },

    otherProjects: {
      type: new GraphQLNonNull(ProjectConnection),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context: Context) => {
        if (!context.extid) return appEmptyConnection();
        return appEmptyConnection();
      },
    },
  }),
  interfaces: [nodeInterface],
});
