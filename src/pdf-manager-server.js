const Koa = require('koa');
const Router = require('@koa/router');
import bodyParser from 'koa-body';

const app = new Koa();
app.use(bodyParser({multipart: true}));

import api from './api';
app.use(api.routes()).use(api.allowedMethods());

module.exports = app;
