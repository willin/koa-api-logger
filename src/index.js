const useragent = require('useragent');

const DEFAULTS = {
  key: 'api'

};

module.exports = (options) => {
  const opts = Object.assign({}, DEFAULTS, options);

  return async (ctx, next) => {
    // log start time

    const start = new Date();
    try {
      await next();
    } catch (err) {

    }
    // log end time
    const end = new Date();
    let path = ctx.request.url;
    if (ctx._matchedRoute) {
      path = `${ctx._matchedRoute}`;
    }
    const ua = useragent.parse(ctx.request.header['user-agent']);
    console.log(ua.toString(), ua.toAgent(), ua.os.toString());
    console.log(path, end - start, 'ms');
  };
};
