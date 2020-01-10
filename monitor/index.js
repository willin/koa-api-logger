const Redis = require('@xibang/redis');
const { pad } = require('@xibang/node-common');

const date = new Date();

module.exports = (config = {}) => {
  const redis = Redis(config);
  const fn = async (key = date.getFullYear() + pad(date.getMonth() + 1, 2) + pad(date.getDate(), 2)) => {
    const result = await redis.hgetall(key);
    return Object.keys(result).map(k => ({
      key: k,
      data: JSON.parse(result[k])
    }));
  };
  fn.history = async () => {
    const keys = await redis.keys(`${config.prefix}*`);
    return keys
      .map(x => ~~x.replace(config.prefix, ''))
      .sort()
      .map(String);
  };
  return fn;
};
