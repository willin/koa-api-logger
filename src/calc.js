const Redis = require('@xibang/redis');
const { pad } = require('@xibang/node-common');

module.exports = (config, ignore = []) => {
  const redis = Redis(config);
  return async ({ path, time, success }) => {
    const date = new Date();
    const key = date.getFullYear() + pad(date.getMonth() + 1, 2) + pad(date.getDate(), 2);
    const keys = ignore.includes(path) ? [path] : ['total', path];
    // Get All
    const tasks = (await Promise.all(keys.map(k => redis.hget(key, k)))).map((x, i) => {
      // Re Calc
      let result;
      if (x === null) {
        result = {
          count: 0,
          success: 0,
          avg: time,
          max: time,
          min: time
        };
      } else {
        try {
          result = JSON.parse(x);
        } catch (e) {
          result = {
            count: 0,
            success: 0,
            avg: time,
            max: time,
            min: time
          };
        }
      }
      result.count += 1;
      if (success) {
        result.success += 1;
        result.avg = result.success > 10e5 ? result.avg : (time + result.avg * (result.success - 1)) / result.success;
        result.max = result.max > time ? result.max : time;
        result.min = result.min < time ? result.min : time;
      }
      return redis.hset(key, keys[i], JSON.stringify(result));
    });
    // Set All
    await Promise.all(tasks);
    if (config.ttl) {
      await redis.expire(key, config.ttl);
    }
  };
};
