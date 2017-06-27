const request = require('supertest');

const Koa = require('koa');
const logger = require('../..');

const app = new Koa();

app.use(logger({
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
    prefix: 'kal:'
  }
}));

app.use((ctx) => {
  ctx.status = 200;
  ctx.body = 'hello';
});

module.exports = request(app.listen());
