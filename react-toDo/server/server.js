	var
	    express = require('express'),
	    path = require('path'),
	    config = require('../webpack.config.dev.js'),
	    webpack = require('webpack'),
	    webpackDevMiddleware = require('webpack-dev-middleware'),
	    webpackHotMiddleware = require('webpack-hot-middleware'),
	    app = express(),
	    compiler = webpack(config);

	app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));
	app.use(webpackHotMiddleware(compiler));

	app.use(express.static('./dist'));

	app.use('/', function(req, res) {
	    res.sendFile(path.resolve('src/index.html'));
	});

	var port = 3000;

	app.listen(port, function(err) {
	    if (err) throw err;
	    console.info('Server listening on ' + port);
	});
