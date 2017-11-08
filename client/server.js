var connect = require('connect');
var serveStatic = require('serve-static');

connect()
.use(serveStatic(__dirname))
.listen(8081, function(err) {
  console.log(
    err
    ? err
    : 'Client server is running at http://localhost:8081'
  );
});
