# @joenoon/demo-ts-server

- GraphQL / Relay
- Typescript & GraphQL type gen
- Sequelize
- Obevo for db migrations

Running:

```
yarn install
docker-compose up -d
# unzip obeve and set OBEVO_HOME.  https://github.com/goldmansachs/obevo/releases
yarn run db:migrate:dev
yarn run dev
```
