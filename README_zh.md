# koa-api-logger

[![npm](https://img.shields.io/npm/v/koa-api-logger.svg?style=plastic)](https://npmjs.org/package/koa-api-logger) [![npm](https://img.shields.io/npm/dm/koa-api-logger.svg?style=plastic)](https://npmjs.org/package/koa-api-logger) [![npm](https://img.shields.io/npm/dt/koa-api-logger.svg?style=plastic)](https://npmjs.org/package/koa-api-logger) [![Coverage Status](https://coveralls.io/repos/github/willin/koa-api-logger/badge.svg?branch=master)](https://coveralls.io/github/willin/koa-api-logger?branch=master) [![Travis-CI](https://travis-ci.org/willin/koa-api-logger.svg?branch=master)](https://travis-ci.org/willin/koa-api-logger)

[English README](https://github.com/willin/koa-api-logger#koa-api-logger)

## 使用说明

### 安装

```bash
yarn add koa-api-logger
# 或
npm i -S koa-api-logger
```

### 项目引用

```js
const Koa = require('koa');
const router = require('koa-router')();
const logger = require('koa-api-logger');

const app = new Koa();

app.use(logger({
  // 配置参数
}));


router.get('/user/:name', (ctx) => {
  ctx.body = name;
});

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
```

### 参数说明

```js
{
  err: async (ctx, err) => {
    // 错误处理函数
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0, // 存储在db0中
    prefix: 'kal:', // 存储键名前缀
    ttl: 86400 * 180 // 存储180天
  }
}
```


## 监控（后端系统中）

```js
const monitor = require('koa-api-logger/monitor');
const appName = monitor({
  host: '127.0.0.1',
  port: 6379,
  db: 0,
  prefix: 'kal:'
});

appName('20170808').then(data=>console.log);
/* 结果结构:
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

## License

MIT

通过支付宝捐赠：

![qr](https://cloud.githubusercontent.com/assets/1890238/15489630/fccbb9cc-2193-11e6-9fed-b93c59d6ef37.png)
