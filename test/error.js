const test = require('ava');
const app = require('./_lib/koa');
const redis = require('./_lib/redis');

test.before(async () => {
  const tasks = (await redis.keys('kal:*')).map(x => redis.hset(x, 'total', '}123adf{}'));
  await Promise.all(tasks);
});

test('JSON Error', async t => {
  const res = await app.get('/user/name');
  t.is(res.status, 200);
  t.is(res.text, 'hello');
});

test('JSON Error 2', async t => {
  const res = await app.get('/user/name');
  t.is(res.status, 200);
  t.is(res.text, 'hello');
});
