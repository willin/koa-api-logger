const assert = require('assert');
const Calc = require('./calc');

const DEFAULTS = {
  // err: async (ctx) => { ctx.status = 500; },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
    prefix: 'kal:',
    ttl: 86400 * 180
  }
};

module.exports = (opts) => {
  const config = Object.assign({}, DEFAULTS, opts);
  assert(config.redis, 'Redis Config Required');
  if (config.err) {
    assert(typeof config.err === 'function', 'Error Handler Require Function');
  }

  const calc = Calc(config.redis);

  return async (ctx, next) => {
    // log start time
    const start = new Date();
    try {
      // ignore favicon.ico
      if (ctx.request.url === '/favicon.ico') {
        return await next();
      }
      await next();
    } catch (e) {
      config.err(ctx, e);
    }
    // log end time
    const end = new Date();
    let path = ctx.request.url;
    if (ctx._matchedRoute) {
      path = `${ctx._matchedRoute}`;
    } else if (path.indexOf('?') !== -1) {
      path = path.split('?')[0];
    }
    await calc({ path, time: end - start, success: ~~ctx.status < 500, useragent: ctx.request.useragent });
  };
};
