require.config({
	baseUrl: '/scripts/',
	paths: {
    jquery: 'libs/jquery',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    router: 'router'
	},
	shim:{
		'backbone': {
			deps: ['underscore','jquery'],
			exports: 'Backbone'
		},
		'underscore':{
			exports: '_'
		}
	}
});
require(['jquery','underscore','backbone','router'],
	function($,_,Backbone,router){
		var range_url = '/data/';
		console.info('start',range_url);
		router.initialize();
	//	var range_view = new router;
	}
);