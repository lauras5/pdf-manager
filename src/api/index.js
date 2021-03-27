const Router = require('@koa/router');

const api = new Router();

const routes = [
    require('./pdf'),
    require('./tag')
];

for(const route of routes) {
    api.use('/api', route.routes(), route.allowedMethods());
}

module.exports = api;
