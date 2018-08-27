import camelCase from 'camelcase';
import glob from 'glob';
import { GraphQLObjectType } from 'graphql';
import path from 'path';

const fields: any = {};
const files = glob.sync('../mutations/*.ts', { cwd: __dirname });
for (const file of files) {
  const basename = path.basename(file, '.ts');
  const exp = require(file);
  for (const [k, v] of Object.entries(exp)) {
    if (v['resolve']) {
      fields[camelCase(k)] = v;
    }
  }
}

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => fields,
});
