import { graphqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
// end graphql
// start webpack
import * as DB from './db';
import { Schema } from './schema';
import * as utils from './utils';

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
if (isDev) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const app = express();

// app.use(compression({threshold: 0}));
if (isDev) {
  app.set('json spaces', 4);
}

// start session

const secret = utils.JWT_SECRET;
const secure = false;
const origin = '*';

app.use(
  cors({
    origin,
  })
);

app.use((req, res, next) => {
  let auth;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    auth = req.headers.authorization.split(' ')[1];
  }
  // console.log('AUTH', req.originalUrl, auth);
  if (auth) {
    try {
      const decoded = utils.jwt.verify(auth, secret);
      // console.log(req.originalUrl, 'JWT:', decoded);
      req['jwt'] = decoded;
    } catch (err) {
      console.log('INVALID AUTH!', err);
    }
  }
  next();
});

// end session

// start graphql

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => {
    const jwt = req ? req['jwt'] : {};
    const extraContext: utils.Context = {
      request: req,
      getUser: async (): Promise<DB.UserInstance | null> => {
        const { extid } = extraContext;
        if (!extid) return null;
        return await DB.User.findOne({
          where: {
            extid,
          },
        });
      },
    };
    if (jwt) {
      extraContext.extid = jwt.extid;
    }
    // console.log({extraContext});
    return {
      schema: Schema,
      context: {
        req,
        ...extraContext,
      },
      ...(isDev
        ? {
            logFunction: ({ action, step, key, data }) => {
              return;
              if (key === 'query') {
                console.log(`QUERY START =============================================>`);
                console.log(data);
                console.log(`QUERY END =============================================>`);
              } else if (key === 'variables') {
                console.log(`VARIABLES START =============================================>`);
                console.log(JSON.stringify(data));
                console.log(`VARIABLES END =============================================>`);
              }
            },
          }
        : null),
    };
  })
);

const port = 3010;
if (port) {
  app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
  });
}

module.exports = app;
