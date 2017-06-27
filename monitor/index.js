const Redis = require('@dwing/redis');
const { pad } = require('@dwing/common');

const date = new Date();

module.exports = (config = {}) => {
  const redis = Redis(config);
  return async (key = date.getFullYear() + pad(date.getMonth() + 1, 2) + pad(date.getDate(), 2)) => {
    const result = await redis.hgetall(key);
    return Object.keys(result).map(k => ({
      key: k,
      data: JSON.parse(result[k])
    }));
  };
};
