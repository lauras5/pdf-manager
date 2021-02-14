const Router =  require('@koa/router');
const fs = require('fs');
const routes = new Router();

const {getPdfs, getPdf} = require('../utilities/pdf-utilities');
const dbInfo = require('../dbInfo');

routes.get('/', async (ctx) => {
    const {page, limit} = ctx.query;
    ctx.body = await getPdfs(dbInfo, page, limit);
});

routes.get('/file', async (ctx) => {
    const {pdf_id} = ctx.query;
    const pdfInfo = await getPdf(dbInfo, pdf_id);
    ctx.type = 'application/pdf';
    ctx.attachment(`${pdfInfo.name}.pdf`, {type: 'inline'});
    ctx.body = fs.readFileSync(pdfInfo.file_location);
});

const router = new Router();

router.use(`/pdf`, routes.routes(), routes.allowedMethods());

module.exports = router;
