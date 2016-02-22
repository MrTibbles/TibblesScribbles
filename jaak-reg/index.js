//jaak exporess parse serve
var
	express = require('express'),
	ParseServer = require('parse-server').ParseServer,
	app = express(),
	api = new ParseServer({
		databaseURI: 'mongodb://data/db/',
		appId: 'jaakParseServer',
		masterKey: 'BallsDeep'
	});

app.use('/parse', api);

var port = 1337;
app.listen(port, function() {
	console.info('Shit th bed');
})