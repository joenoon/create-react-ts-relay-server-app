import base64url from 'base64url';
import { GraphQLID, GraphQLNonNull } from 'graphql';

function base64(str: string): string {
  return base64url.encode(str);
}

function unbase64(str: string): string {
  return base64url.decode(str);
}

type ResolvedGlobalId = {
  type: string;
  id: string;
};

/**
 * Takes a type name and an ID specific to that type name, and returns a
 * "global ID" that is unique among all types.
 */
export function toGlobalId(type: string, id: string): string {
  return base64([type, id].join(':'));
}

/**
 * Takes the "global ID" created by toGlobalID, and returns the type name and ID
 * used to create it.
 */
export function fromGlobalId(globalId: string): ResolvedGlobalId {
  const unbasedGlobalId = unbase64(globalId);
  const delimiterPos = unbasedGlobalId.indexOf(':');
  return {
    type: unbasedGlobalId.substring(0, delimiterPos),
    id: unbasedGlobalId.substring(delimiterPos + 1),
  };
}

/**
 * Creates the configuration for an id field on a node, using `toGlobalId` to
 * construct the ID from the provided typename. The type-specific ID is fetched
 * by calling idFetcher on the object, or if not provided, by accessing the `id`
 * property on the object.
 */
export function globalIdField(typeName?: string, idFetcher?: (object: any, context: any, info: any) => string) {
  return {
    name: 'id',
    description: 'The ID of an object',
    type: new GraphQLNonNull(GraphQLID),
    resolve: (obj, args, context, info) => toGlobalId(typeName || info.parentType.name, idFetcher ? idFetcher(obj, context, info) : obj.id),
  };
}
