const Redis = require('@shiwangme/redis').default;
const { pad } = require('@xibang/node-common');

const date = new Date();

module.exports = (config = {}) => {
  const redis = Redis(...[].concat(config));
  const fn = async (key = date.getFullYear() + pad(date.getMonth() + 1, 2) + pad(date.getDate(), 2)) => {
    const result = await redis.hgetall(key);
    return Object.keys(result).map(k => ({
      key: k,
      data: JSON.parse(result[k])
    }));
  };
  const opts = [].concat(config);
  const prefix = opts[opts.length - 1].keyPrefix || '';
  fn.history = async () => {
    const keys = await redis.keys(`${prefix}*`);
    return keys
      .map(x => ~~x.replace(prefix, ''))
      .sort()
      .map(String);
  };
  return fn;
};
