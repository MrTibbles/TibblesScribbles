require.config({
  baseUrl: 'scripts/',
  paths: {
    jQuery: '../../bower_components/jquery/dist/jquery.min',
    'jquery-ui': '../../bower_components/jquery-ui/jquery-ui',
    underscore: '../../bower_components/underscore-amd/underscore-min',
    backbone: '../../bower_components/backbone-amd/backbone-min',
    loader: '../scripts/libs/spin.min',
    infoBox: '../scripts/libs/infobox',
    jQueryValidate: '../../bower_components/jquery-validate/jquery.validate.min',
    jqueryValidateAdditional: '../../bower_components/jquery-validate/jquery.validate.additional-methods'
  }
});
require(['jQuery', 'underscore', 'backbone', 'router', 'infoBox', 'jQueryValidate', 'jqueryValidateAdditional', 'jquery-ui'], function($, _, Backbone) {
  /*
   *
   * Toyota Online Booking Application
   *	v0.1
   *
   */
  var ua = window.navigator.userAgent,
    msie = ua.indexOf('MSIE '), ieV;

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    ieV = ua.substring(msie + 5, ua.indexOf('.', msie));
    $('body').addClass('msie v' + ieV + '');

    if (ieV === '8') {
      $('#mileage')
        .val('Approximate mileage - this helps us to find you the right service options')
        .on('focus', function(e) {
          $(this).val('');
        })
        .on('blur', function(e) {
          if ($(this).val() === '') {
            $(this).val('Approximate mileage - this helps us to find you the right service options');
          }
        })
    }
  }
});
