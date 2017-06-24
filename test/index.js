const Koa = require('koa');
const router = require('koa-router')();
const logger = require('..');

const app = new Koa();

router.get('/user/:name', (ctx) => {
  ctx.body = '1';
});

router.get(/^\/app(?:\/|$)/, (ctx) => {
  ctx.body = ctx.params;
  const params = ctx.request.url.replace('/app/', '').split('/');
  console.log(params);
  // /app/type/1/fieldname/xxx
});

app.use(logger({

}));

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
