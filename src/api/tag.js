const {getTagScopedRouter, setupTagSystem} = require('sql-tag-system-koa-route');
const dbInfo = require('../dbInfo');

setupTagSystem(dbInfo).then(() => {});
const router = getTagScopedRouter(dbInfo);

module.exports = router;
