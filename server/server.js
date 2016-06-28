var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
var path = require('path');
const customMethods      = require('./customroutes.js')(app);
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');

    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

app.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: path.resolve(__dirname, '..', 'client') });

});
app.all('/laundry/:id?', function(req, res, next) {
  res.sendFile('index.html', { root: path.resolve(__dirname, '..', 'client') });
});

app.get(/\/(welcome|menu)\/*/, function(req, res, next) {
  res.sendFile('index.html', { root: path.resolve(__dirname, '..', 'client') });
});
app.all('/customapi/orderForPickUp', function(req, res, next) {
	var data = JSON.parse(req);
	console.log('req', data);
	customMethods.orderForPickup(data, res);
});




boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

