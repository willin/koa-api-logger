const test = require('ava');
const app = require('./_lib/koa');
const redis = require('./_lib/redis');

test.before(async () => {
  const tasks = (await redis.keys('kal:*')).map(x => redis.del(x));
  await Promise.all(tasks);
});

test('ignore /favicon.ico', async (t) => {
  const res = await app.get('/favicon.ico');
  t.is(res.status, 200);
  t.is(res.text, 'hello');
});

test('bare koa', async (t) => {
  const res = await app.get('/user/name');
  t.is(res.status, 200);
  t.is(res.text, 'hello');
});
