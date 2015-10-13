define(['underscore', 'backbone'], function(_, Backbone) {
  var tgbEnvironmentChecker = Backbone.View.extend({
    environment: function() {
      return tgbEnv = (window.location.hostname === 'uat.toyotabeta.co.uk' || window.location.hostname === 'localhost') || this.TCW() ? '//uat.toyotabeta.co.uk' : '//www.toyota.co.uk';
    },
    TCW: function() {
      return navigator.userAgent.indexOf('TCW DEV') != -1 ? true : false;
    }
  });
  return tgbEnvironmentChecker;
})
