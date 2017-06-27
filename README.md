# koa-api-logger

[![npm](https://img.shields.io/npm/v/koa-api-logger.svg?style=plastic)](https://npmjs.org/package/koa-api-logger) [![npm](https://img.shields.io/npm/dm/koa-api-logger.svg?style=plastic)](https://npmjs.org/package/koa-api-logger) [![npm](https://img.shields.io/npm/dt/koa-api-logger.svg?style=plastic)](https://npmjs.org/package/koa-api-logger)

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

app.use(logger({
  // options
}));


router.get('/user/:name', (ctx) => {
  ctx.body = name;
});

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
```

### Options

```js
{
  err: async (ctx, err) => {
    // codes to handle error
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0, // db to store
    prefix: 'kal:', // redis store prefix
    ttl: 86400 * 180 // saving logs for 180 days
  }
}
```

## Design 

### Redis Hash Table

`key:20170808`

key   | val
---   | ---
total | {count:1,success:1,avg:1,max:1,min:1}
/#{path} | {count:1,success:1,avg:1,max:1,min:1}


## License

MIT

Donate Via Alipay：

![qr](https://cloud.githubusercontent.com/assets/1890238/15489630/fccbb9cc-2193-11e6-9fed-b93c59d6ef37.png)
