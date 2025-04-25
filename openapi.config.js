import { generate } from 'openapi-typescript-codegen';

generate({
  input: 'https://petstore3.swagger.io/api/v3/openapi.json',
  output: './support/api',
  useOptions: true,
  useUnionTypes: false,
  onlyModels: true,
});
