import Router from '@koa/router';

const api = new Router();

const routes = [
];

for(const route of routes) {
    api.use('/api', route.routes(), route.allowedMethods());
}

export default api;
å
