const {isMainProcess} = require('./src/utilities/utilities');
const app = require('./src/index');

if (isMainProcess(__filename)) {
  const port = process.argv[2] || 3001;
  app.listen(port);
  console.log('Starting app on port: ' + port);
}

module.exports = app;
