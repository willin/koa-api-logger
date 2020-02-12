# koa-api-logger

[![npm](https://img.shields.io/npm/v/koa-api-logger.svg?style=plastic)](https://npmjs.org/package/koa-api-logger) [![npm](https://img.shields.io/npm/dm/koa-api-logger.svg?style=plastic)](https://npmjs.org/package/koa-api-logger) [![npm](https://img.shields.io/npm/dt/koa-api-logger.svg?style=plastic)](https://npmjs.org/package/koa-api-logger) [![codecov](https://codecov.io/gh/willin/koa-api-logger/branch/master/graph/badge.svg)](https://codecov.io/gh/willin/koa-api-logger) [![Travis-CI](https://travis-ci.org/willin/koa-api-logger.svg?branch=master)](https://travis-ci.org/willin/koa-api-logger)

[中文说明](https://github.com/willin/koa-api-logger/blob/master/README_zh.md#koa-api-logger)

## Usage

### Install

```bash
yarn add koa-api-logger
# or
npm i -S koa-api-logger
```

### Use

```js
const Koa = require('koa');
const router = require('koa-router')();
const logger = require('koa-api-logger');

const app = new Koa();

app.use(
  logger({
    // options
  })
);

router.get('/user/:name', ctx => {
  ctx.body = name;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
```

### Options

```js
{
  err: async (ctx, err) => {
    // codes to handle error
  },
  // Such as: ['/upload']
  ignore: [],
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0, // db to store
    keyPrefix: 'kal:', // redis store prefix
    ttl: 86400 * 180 // saving logs for 180 days
  }
}
```

## Design

### Redis Hash Table

`key:20170808`

| key      | val                                   |
| -------- | ------------------------------------- |
| total    | {count:1,success:1,avg:1,max:1,min:1} |
| /#{path} | {count:1,success:1,avg:1,max:1,min:1} |

## Monitor

```js
const monitor = require('koa-api-logger/monitor');
const appName = monitor({
  host: '127.0.0.1',
  port: 6379,
  db: 0,
  keyPrefix: 'kal:'
});

appName('20170808').then(data => console.log);
/* like:
[
  {
    key: 'total',
    data: { count: 2, success: 2, avg: 0.5, max: 1, min: 0 }
  },
  {
    key: '/user/:name',
    data: { count: 3, success: 3, avg: 0.3333333333333333, max: 1, min: 0 }
  }
]
*/
```

History:

```js
appName.history().then(data => console.log);
/* like:
[
 '20170504',
 '20170505'
]
*/
```

## License

MIT

Donate Via Alipay：

![qr](https://cloud.githubusercontent.com/assets/1890238/15489630/fccbb9cc-2193-11e6-9fed-b93c59d6ef37.png)
