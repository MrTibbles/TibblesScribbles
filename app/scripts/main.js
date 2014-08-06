require.config({
	baseUrl: 'scripts/',
	paths: {
		'jquery': '../bower_components/jquery/jquery.min',
		'jqueryui': '../bower_components/jquery-ui/ui/minified/jquery-ui.min',
		'underscore': '../bower_components/underscore-amd/underscore-min',
		'backbone': '../bower_components/backbone-amd/backbone-min',
		'loader' : '../scripts/libs/spin.min',
		'free-wall': '../scripts/libs/freewall'
	}
});
require(['jquery', 'jqueryui', 'backbone', 'free-wall', 'router'], function($,Backbone){
	//Not sure what to put in here tbh!!!
	//New Car Chapter Gallery v0.2
});
