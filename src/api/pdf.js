const Router = require('@koa/router');
const fs = require('fs').promises;
const path = require('path');
const routes = new Router();
const {PDFDocument} = require('pdf-lib');
const {makeid} = require('../utilities/utilities');

const {listPdfs, getPdf, addPdf, getChildrenPdfs, searchPdfs} = require('../utilities/pdf-utilities');
const dbInfo = require('../dbInfo');

routes.get('/', async (ctx) => {
    const {page, limit, pdf_id, parent_id, order, order_by, term} = ctx.query;
    if (pdf_id) {
        ctx.body = await getPdf(dbInfo, pdf_id);
    } else if (parent_id) {
        ctx.body = await getChildrenPdfs(dbInfo, parent_id, page, limit);
    } else {
        if (term) {
            ctx.body = await searchPdfs(dbInfo, term, order_by, order, page, limit);
        } else {
            ctx.body = await listPdfs(dbInfo, order_by, order, page, limit);
        }
    }
});

routes.get('/file', async (ctx) => {
    const {pdf_id} = ctx.query;
    const pdfInfo = await getPdf(dbInfo, pdf_id);
    ctx.type = 'application/pdf';
    ctx.attachment(`${pdfInfo.name}.pdf`, {type: 'inline'});
    ctx.body = await fs.readFile(pdfInfo.file_location);
});

routes.post('/file', async (ctx) => {
    const {pdf_id, pages} = ctx.query;
    const pdfInfo = await getPdf(dbInfo, pdf_id);
    let finalId = pdfInfo.parent_id ? pdfInfo.parent_id : pdfInfo.pdf_id;
    const newDoc = await PDFDocument.create();
    const pdf = await PDFDocument.load(await fs.readFile(pdfInfo.file_location))
    const copiedPages = await newDoc.copyPages(pdf, JSON.parse(pages).filter(e => e < pdf.getPageCount()));
    copiedPages.forEach(e => newDoc.addPage(e));
    const finalDoc = await newDoc.save();
    const docPath = path.join(process.env.HOME, 'pdf_data', 'children', `${pdfInfo.name}.child-${makeid(16)}.pdf`);
    await fs.writeFile(docPath, finalDoc);
    ctx.body = {pdf_id: await addPdf(dbInfo, docPath, finalId)};
})

const router = new Router();

router.use(`/pdf`, routes.routes(), routes.allowedMethods());

module.exports = router;
