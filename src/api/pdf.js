const Router =  require('@koa/router');

const routes = new Router();

const {getPdfs} = require('../utilities/pdf-utilities');
const dbInfo = require('../dbInfo');

routes.get('/', async (ctx) => {
    const {page, limit} = ctx.query;
    ctx.body = await getPdfs(dbInfo, page, limit);
});

const router = new Router();

router.use(`/pdf`, routes.routes(), routes.allowedMethods());

module.exports = router;
