const test = require('ava');
const Koa = require('koa');
const logger = require('..');

const app = new Koa();

test('Options: err', (t) => {
  const err = t.throws(() => {
    app.use(logger({
      err: 'test'
    }));
  }, Error);
  t.is(err.message, 'Error Handler Require Function');
});
