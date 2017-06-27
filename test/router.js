const test = require('ava');
const app = require('./_lib/router');
const redis = require('./_lib/redis');

test.before(async () => {
  const tasks = (await redis.keys('kal:*')).map(x => redis.del(x));
  await Promise.all(tasks);
});

test('koa router', async (t) => {
  const res = await app.get('/user/name');
  t.is(res.status, 200);
  t.is(res.text, 'name');
});

test('koa router', async (t) => {
  const res = await app.get('/user/willin');
  t.is(res.status, 200);
  t.is(res.text, 'willin');
});

test('err handler', async (t) => {
  const res = await app.get('/error');
  t.is(res.status, 500);
});
