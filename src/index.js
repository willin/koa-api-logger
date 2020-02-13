const assert = require('assert');
const Calc = require('./calc');

const DEFAULTS = {
  // err: async (ctx) => { ctx.status = 500; },
  ignore: [],
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
    keyPrefix: 'kal:',
    ttl: 86400 * 180
  }
};

const IGNORE_PATH = ['/favicon.ico', '/robots.txt'];

module.exports = opts => {
  const config = { ...DEFAULTS, ...opts };
  assert(config.redis, 'Redis Config Required');
  if (config.err) {
    assert(typeof config.err === 'function', 'Error Handler Require Function');
  }

  const calc = Calc(config.redis, config.ignore);

  return async (ctx, next) => {
    // log start time
    const start = new Date();
    try {
      // ignore favicon.ico
      if (IGNORE_PATH.includes(ctx.request.url)) {
        return await next();
      }
      await next();
    } catch (e) {
      config.err(ctx, e);
    }
    // log end time
    const end = new Date();
    let path = ctx.request.url;
    const { method } = ctx.request;
    if (ctx._matchedRoute) {
      path = `${ctx._matchedRoute}`;
    } else if (path.indexOf('?') !== -1) {
      // eslint-disable-next-line prefer-destructuring
      path = path.split('?')[0];
    }
    await calc({ path: `${method}::${path}`, time: end - start, success: ~~ctx.status < 500, useragent: ctx.request.useragent });
  };
};
