//Prototype bind emulation for older browsers
Function.prototype.bind = Function.prototype.bind || function(fixThis) {
	var func = this 
	return function() {
  	return func.apply(fixThis, arguments)
	}
}

//General variables
var yarisScroll, 
	$window = jQuery(window),
	//bind emulator for event attachment
	attach = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	//Default params
	opts = {
		container: '#main-content-wrapper',
		spinItem: '.spin-cover img'
	};




yarisScroll = (function($){

	//Check that its the only instance of Yaris scroll obj on page
	yarisScroll.getInstance = function() {
    return yarisScroll.instance != null ? yarisScroll.instance : yarisScroll.instance = (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(yarisScroll, arguments, function(){});
  };

  //Emulation of event handlers
  yarisScroll.addEventListener = function(target, eventName, callback) {
    if (document.addEventListener) {
      return target.addEventListener(eventName, callback, true);
    } else if (document.attachEvent) {
      return target.attachEvent('on' + eventName, callback);
    } else {
      return target['on' + eventName] = callback;
    }
  };

  yarisScroll.init = function(){
  	return yarisScroll.getInstance();
  }

	function yarisScroll(){
		this.skrollr = skrollr.init();
		this.checkScroll = attach(this.checkScroll, this);
		this.downSpin = attach(this.downSpin, this);
		this.resetSpin = attach(this.resetSpin, this);
		this.container = document.querySelectorAll(opts.container)
		this.spinItem = document.querySelectorAll(opts.spinItem);
		this.lastScrollTop = 0;

		//Instantiate event handlers
		return this.events();
	}

	yarisScroll.prototype.events = function(){

		//Check scroll position of window - Throttle it to reduce DOM interaction
		var throttleScroll = _.throttle(this.checkScroll, 5);
		$window.on('scroll', throttleScroll);

	};

	yarisScroll.prototype.checkScroll = function(){

		var currentScrollTop = $window.scrollTop(),
			scrollThrottle = Math.floor($window.scrollTop() / 10);

		currentScrollTop > 0 && this.doSpin(scrollThrottle);

		currentScrollTop <= 0 && this.resetSpin();

		// window.console && console.info(currentScrollTop);
		// if (currentScrollTop > this.lastScrollTop){
		//    // currentScrollTop > 0 && this.doSpin(scrollThrottle);
		// } else {
		//   // currentScrollTop > 0 && this.upSpin(scrollThrottle);
		// }
		// this.lastScrollTop = currentScrollTop;	

		return scrollThrottle;
	};

	yarisScroll.prototype.doSpin = function(scrollTop){
		
		scrollTop = scrollTop < 10 ? '0' + scrollTop : scrollTop;

		//Conventional petrol
		this.spinItem[0].setAttribute('src','images/' + scrollTop + '.png');
		//Hybrid model
		this.spinItem[1].setAttribute('src','images/hsd/' + scrollTop + '.png');

	};

	yarisScroll.prototype.resetSpin = function(scrollTop){
					
		for(var i = this.spinItem.length - 1; i >= 0; i--){
			this.spinItem[parseInt(i)].setAttribute('src','images/00.png');
		} 

	};

	return yarisScroll;

})(jQuery);

//Wait for page load prior to instantiate 
yarisScroll.addEventListener(window, 'load', yarisScroll.init);