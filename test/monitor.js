const test = require('ava');
const { pad } = require('@xibang/node-common');
const monitor = require('../monitor');

test('Monitor', async t => {
  const app = monitor();
  const date = new Date();
  const result = await app(`kal:${date.getFullYear()}${pad(date.getMonth() + 1, 2)}${pad(date.getDate(), 2)}`);
  t.is(Array.isArray(result), true);
});

test('Monitor prefix', async t => {
  const app = monitor({
    keyPrefix: 'kal:'
  });
  const result = await app();
  t.is(Array.isArray(result), true);
});

test('Monitor History', async t => {
  const app = monitor({
    keyPrefix: 'kal:'
  });
  const result = await app.history();
  t.is(Array.isArray(result), true);
});
