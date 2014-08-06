require.config({
	baseUrl: 'scripts/',
	paths: {
		'jquery': '../bower_components/jquery/jquery.min',
		'underscore': '../bower_components/underscore-amd/underscore-min',
		'backbone': '../bower_components/backbone-amd/backbone-min',
		'loader' : '../bower_components/spinjs/spin.min'
	}
});
require(['jquery','backbone','loader','mixins/spin','router'], function($,Backbone){
	//Not sure what to put in here tbh!!! 
	//Car Chapter Gallery v0.1
})