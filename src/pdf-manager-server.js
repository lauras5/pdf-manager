const Koa = require('koa');
const bodyParser = require('koa-body');
const {createDatabase, createPdfTable} = require('./utilities/pdf-utilities');

const app = new Koa();
app.use(bodyParser({multipart: true}));

const api = require('./api');
app.use(api.routes()).use(api.allowedMethods());

const dbInfo = require('./dbInfo');

createDatabase({...dbInfo, database: ''}).then(() => createPdfTable(dbInfo).then(() => {}));

module.exports = app;
