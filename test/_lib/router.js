const request = require('supertest');

const Koa = require('koa');
const router = require('koa-router')();
const logger = require('../..');

const app = new Koa();

router.get('/user/:name', (ctx) => {
  ctx.body = ctx.params.name;
});

router.get('/error', () => {
  /* eslint no-throw-literal:0 */
  throw 'Error';
});

app.use(logger({
  err: async (ctx) => { ctx.status = 500; }
}));

app.use(router.routes())
  .use(router.allowedMethods());

module.exports = request(app.listen());
