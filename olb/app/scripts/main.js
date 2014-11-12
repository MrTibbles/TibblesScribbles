require.config({
	baseUrl: 'scripts/',
	paths: {
		'jquery': '../bower_components/jquery/dist/jquery.min',
		'jquery-ui': '../bower_components/jquery-ui/jquery-ui',
		'jQueryValidate': '../bower_components/jquery-validate/jquery.validate.min',
		'jQueryValidateAdditional': '../bower_components/jquery-validate/jquery.validate.additional-methods',
		'underscore': '../bower_components/underscore-amd/underscore-min',
		'backbone': '../bower_components/backbone-amd/backbone-min',
		'loader' : '../scripts/libs/spin.min',
		'infoBox': '../scripts/libs/infobox'
	}
});
require(['jquery', 'underscore', 'backbone', 'router', 'infoBox', 'jQueryValidate', 'jQueryValidateAdditional', 'jquery-ui'], function($, _, Backbone) {
	/*
	*
	* Toyota Online Booking Application
	*	v0.1
	*
	*/
	var ua = window.navigator.userAgent,
		msie = ua.indexOf('MSIE ');

	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
		var ieV = ua.substring(msie + 5, ua.indexOf('.', msie));
		$('body').addClass('msie v' + ieV + '');
	}
});
