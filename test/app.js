const Koa = require('koa');
const logger = require('..');

const app = new Koa();

app.use(logger({

}));

app.use((ctx) => {
  // console.log(ctx.request);
});

app.listen(3000);
