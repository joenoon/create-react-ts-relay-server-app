import fs from 'fs';
import { graphql, printSchema } from 'graphql';
import { generate } from 'graphql-code-generator';
import { introspectionQuery } from 'graphql/utilities';
import * as path from 'path';
import { Schema } from './schema';

async function main() {
  const result = await graphql(Schema, introspectionQuery);
  if (result.errors) {
    console.error('ERROR introspecting schema: ', JSON.stringify(result.errors, null, 2));
    throw new Error('Failed');
  } else {
    fs.writeFileSync(path.join(__dirname, './schema/ro.schema.json'), JSON.stringify(result, null, 2));
  }
  const plain = printSchema(Schema);
  fs.writeFileSync(path.join(__dirname, '../../demo-react-app/ro.schema.graphql'), plain);

  await generate({
    template: 'typescript',
    schema: path.resolve(__dirname, './schema/ro.schema.json'),
    out: path.resolve(__dirname, './schema/ro.schema.d.ts'),
    config: path.resolve(__dirname, './gql-gen-server.json'),
    overwrite: true,
  });
}

try {
  main();
} catch (e) {
  console.log('ERR', e);
}
