const test = require('ava');
const { pad } = require('@dwing/common');
const monitor = require('../monitor');

test('Monitor', async (t) => {
  const app = monitor();
  const date = new Date();
  const result = await app(`kal:${date.getFullYear()}${pad(date.getMonth() + 1, 2)}${pad(date.getDate(), 2)}`);
  t.is(Array.isArray(result), true);
});

test('Monitor', async (t) => {
  const app = monitor({
    prefix: 'kal:'
  });
  const result = await app();
  t.is(Array.isArray(result), true);
});
