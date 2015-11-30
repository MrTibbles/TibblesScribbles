//CSS slider
var self = Slider = function(config) {
  console.info('New slider with target: ' + (config.target || '.slider'));

  this.opts = {
    target: document.querySelector(config.target) || document.querySelector('.slider'),
    slideDuration: config.duration || 500,
    easing: config.easing || 'cubic-bezier(.25,.1,.25,1)',
    slideIndex: config.startSlide || 0,
    inifinte: config.inifinte || false,
    direction: config.direction.toUpperCase() || 'X',
    scroll: config.scroll || false,
    scrollBound: config.scrollBound || 20,
    autoScroll: config.autoScroll || false,
    autoScrollDelay: config.autoScrollDelay || 11000,
    draggable: config.draggable || false,
    bullets: config.bullets || false
  };

  this.jimmy = 'ontouchend' in window ? true : false;
  this.clickEvent = 'ontouchend' in window ? 'touchend' : 'click';
  this.startEvent = this.jimmy ? 'touchstart' : 'mousedown';
  this.moveEvent = this.jimmy ? 'touchmove' : 'mousemove';
  this.endEvent = this.jimmy ? 'touchend' : 'mouseup';

  self = this;
  return this.init();
};

Slider.prototype = {

  init: function() {   
    self.sliderContent = self.opts.target.querySelector('.slider-wrap');
    self.slideSize = self.opts.direction === 'Y' ? self.sliderContent.querySelector('.slide').offsetHeight : self.sliderContent.querySelector('.slide').offsetWidth;
    
    self.getCssPrefix();
    this.countSlides();   

    self.opts.startSlide && self.goToSlide(self.opts.startSlide);  

    self.opts.inifinte && self.cloneSlides();

    self.opts.bullets && self.makeBullets();

    self.opts.draggable && self.opts.target.classList.add('draggable');
    // self.sliderContent.style.width = (self.slideSize * self.origSlideCount) + 'px';
    self.opts.target.classList.add(self.opts.direction);

    self.scrolling = self.interacted = false;
    return this.attachUiEvents();
  },

  getCssPrefix: function() {
    var
      compStyle = window.getComputedStyle(self.sliderContent, null),
      prefix = (Array.prototype.slice.call(compStyle).join('').match(/-(moz|webkit|ms)-/) || (compStyle.OLink === '' && ['', 'o']))[1];

    if (compStyle.getPropertyValue('-webkit-transform')) {
      return self.cssPrefix = '-webkit-';
    } else if (compStyle.getPropertyValue('-moz-transform')) {
      return self.cssPrefix = '-moz-'
    } else if (compStyle.getPropertyValue('-ms-transform')) {
      return self.cssPrefix = '-ms-'
    } else if (compStyle.getPropertyValue('-o-transform')) {
      return self.cssPrefix = '-o-'
    } else {
      return self.cssPrefix = ''
    }
  },

  debounceEvent: function(userOpts) {
    var opts = {
        eventName: false,
        ele: false,
        onComplete: false,
        toWait: 500
      },
      throttleCacheEvent;

    opts.extendObj(opts, userOpts);

    function completeFunction(e) {      
      if (typeof(opts.onComplete) === 'function') {
        opts.onComplete(e, opts.ele);
      }
    }

    opts.ele.addEventListener(opts.eventName, function(e) {
      var ele = e.currentTarget;
      clearTimeout(throttleCacheEvent);
      throttleCacheEvent = setTimeout(function() {
        completeFunction(ele);
      }, opts.toWait);
    });
  },

  countSlides: function() {
    self.slides = self.sliderContent.querySelectorAll('.slide');
    self.origSlideCount = self.slides.length;
  },

  makeBullets: function() {
    for (var i = 0; i <= self.origSlideCount - 1; i += 1) {
      var bullet = document.createElement('button');
      bullet.classList.add('bullet');
      bullet.dataset.index = i + 1;
      bullet.addEventListener(self.clickEvent, self.goToSlide, false);
      self.opts.target.querySelector('.gallery-navigation').appendChild(bullet);

      if (i === 0) bullet.classList.add('active');
    }
  },

  attachUiEvents: function() {
    self.navButtons = self.opts.target.querySelectorAll('.slider-navigation');
    for (var i = self.navButtons.length - 1; i >= 0; i -= 1) {
      self.navButtons[i].classList.add('available');
      // self.navButtons[i].addEventListener(self.clickEvent, this.checkSlider, false);
      self.debounceEvent({
        eventName: self.clickEvent,
        ele: self.navButtons[i],
        toWait: 200,
        onComplete: self.checkSlider
      });
    }

    document.addEventListener('keyup', self.keyboardMove, false);

    !self.opts.inifinte && self.opts.target.querySelector('.slider-prev').classList.remove('available');

    self.opts.scroll && window.addEventListener('wheel', self.scrollMovement, false);    
    // self.opts.scroll && self.debounceEvent({
    //   eventName: 'wheel',
    //   ele: window,
    //   toWait: 100,
    //   onComplete: self.scrollMovement
    // });

    window.addEventListener('orientationchange', self.jumpToSlide, false);
    window.addEventListener('resize', self.jumpToSlide, false);

    if (self.jimmy || self.opts.draggable) {
      self.opts.target.addEventListener(self.startEvent, self.touchStart, false);
      self.opts.target.addEventListener(self.moveEvent, self.touchMovement, false);
      self.opts.target.addEventListener(self.endEvent, self.touchEnd, false);            
    } else if (self.opts.autoScroll) {
      self.autoScrollInterval = setInterval(self.doAutoScroll, self.opts.autoScrollDelay);
    }    
  },

  goToSlide: function(targetIndex) {
    self.opts.slideIndex = typeof targetIndex === 'Number' ? targetIndex : (targetIndex.currentTarget.dataset.index || targetIndex.currentTarget.data.index);    

    self.interacted = true;
    return self.moveSlider();
  },

  cloneSlides: function(direction) {
    var
      firstSlide = self.slides[self.origSlideCount - 1].cloneNode(true);      
      lastSlide = self.slides[0].cloneNode(true);      

    self.sliderContent.insertBefore(firstSlide, self.slides[0]);
    self.sliderContent.appendChild(lastSlide);
    self.sliderContent.style[self.cssPrefix + 'transform'] = self.getTranslateVal(self.slideSize);
    self.sliderContent.style['transform'] = self.getTranslateVal(self.slideSize);
          
    self.opts.slideIndex = 1;
  },

  doAutoScroll: function() {
    if (self.interacted) {
      return clearInterval(self.autoScrollInterval);
    }
    return self.checkSlider('next');
  },

  keyboardMove: function(e) {
    switch (e.keyCode) {
      case 38:
      case 37:
        return self.checkSlider('prev');
        break;
      case 40:
      case 39:
        return self.checkSlider('next');
        break;
      default:
        return;
        break
    }
  },

  scrollMovement: function(e) {
    if (self.scrolling) return;
    if (Math.abs(e.deltaY) < self.opts.scrollBound) {
      return;
    }

    var scrollDirection;

    self.interacted = true;
    if (e.wheelDelta) {
      scrollDirection = e.wheelDelta < 0 ? 'next' : 'prev';
    }else if (e.deltaY) {
      scrollDirection = e.deltaY > 0 ? 'next' : 'prev';
    }

    return self.checkSlider(scrollDirection);
  },

  touchStart: function(e) {
    if (self.scrolling) return
    self.opts.target.classList.add('dragging');

    self.interacted = true;
    self.startTouch = Math.floor(e.clientY) || Math.floor(e.touches[0].clientY);    
  },

  touchMovement: function(e) {
    self.endTouch = Math.floor(e.clientY) || Math.floor(e.touches[0].clientY);
  },

  touchEnd: function(e) {
    if (!self.startTouch || !self.endTouch) return;
    var touchDirection = self.startTouch > self.endTouch ? 'next' : 'prev';
    
    self.opts.target.classList.remove('dragging');

    self.startTouch = 0;
    self.endTouch = 0;
    return self.checkSlider(touchDirection);
  },  

  checkSlider: function(ele) {
    var direction = typeof ele === 'string' ? ele : ele.attributes['data-direction'].value;
    
    //catch nav button interaction to kill interval on auto scroll
    if (typeof ele !== 'string') clearInterval(self.autoScrollInterval);

    //infinite slider nav is always available, scrolling is only set on movement
    if (self.scrolling || typeof ele !== 'string' && !ele.classList.contains('available')) return;
    self.scrolling = true;

    //remove easing on slider track
    self.sliderContent.style[self.cssPrefix + 'transition'] = '';

    self.opts.slideIndex = direction === 'next' ? self.opts.slideIndex += 1 : self.opts.slideIndex -= 1;

    // var canSlide = !self.opts.inifinte && (self.opts.slideIndex >= 0 && self.opts.slideIndex < self.origSlideCount);    
    if (!self.opts.inifinte) {
      if (self.opts.slideIndex <= 0) {
        self.opts.target.querySelector('.slider-prev').classList.remove('available');
        self.opts.slideIndex = 0;
      } else if (self.opts.slideIndex >= self.origSlideCount - 1) {
        self.opts.target.querySelector('.slider-next').classList.remove('available');
        self.opts.slideIndex = self.origSlideCount - 1;
      } else if (self.opts.slideIndex >= 0 && self.opts.slideIndex < self.origSlideCount - 1) {
        for (var i = self.navButtons.length - 1; i >= 0; i -= 1) {
          self.navButtons[i].classList.add('available');
        }
      }
    }

    return self.moveSlider();
  },

  jumpToSlide: function(idx) {
    self.slideSize = self.opts.direction === 'Y' ? self.sliderContent.querySelector('.slide').offsetHeight : self.sliderContent.querySelector('.slide').offsetWidth;
    self.sliderContent.style[self.cssPrefix + 'transition'] = '';
    self.sliderContent.style['transition'] = '';

    self.sliderContent.style[self.cssPrefix + 'transform'] = self.getTranslateVal(self.slideSize * self.opts.slideIndex);
    self.sliderContent.style['transform'] = self.getTranslateVal(self.slideSize * self.opts.slideIndex);
  },

  moveSlider: function() {
    //add easing on slider track
    self.sliderContent.style[self.cssPrefix + 'transition'] = self.cssPrefix + 'transform ' + self.opts.slideDuration + 'ms ' + self.opts.easing + '';
    self.sliderContent.style['transition'] = self.cssPrefix + 'transform ' + self.opts.slideDuration + 'ms ' + self.opts.easing + '';

    self.sliderContent.style[self.cssPrefix + 'transform'] = self.getTranslateVal(self.slideSize * self.opts.slideIndex);   
    self.sliderContent.style['transform'] = self.getTranslateVal(self.slideSize * self.opts.slideIndex);

    setTimeout(self.slideComplete, (self.opts.slideDuration / 3));
  },

  updateBullets: function() {
    for (var i = 0; i <= self.origSlideCount - 1; i += 1) {
      self.opts.target.querySelectorAll('.bullet')[i].classList.remove('active');
    }
    self.opts.target.querySelectorAll('.bullet')[self.opts.slideIndex - 1].classList.add('active');
  },

  slideComplete: function() {    
    self.slides = self.sliderContent.querySelectorAll('.slide');

    if (self.opts.inifinte) {
      setTimeout(self.checkInfinitePosition, self.opts.slideDuration);
    } else self.addActiveClass();
  },

  addActiveClass: function() {
    for (var i = self.slides.length - 1; i >= 0; i -= 1) {
      self.slides[i].classList.remove('current-slide');  
    }
    var activeSlide = self.opts.slideIndex - 1 < 0 ? 0 : self.opts.slideIndex;
    self.slides[activeSlide].classList.add('current-slide');

    self.updateBullets();
    return self.scrolling = false;
  },

  getTranslateVal: function(value) {
    if (self.opts.direction !== 'Y') {
      return 'translate3d(-' + value + 'px, 0, 0)';
    }else return 'translate3d(0, -' + value + 'px, 0)';
  },

  checkInfinitePosition: function() {
    //remove easing on slider track
    self.sliderContent.style[self.cssPrefix + 'transition'] = '';
    self.sliderContent.style['transition'] = '';

    if (self.opts.slideIndex <= 0) {
      self.opts.slideIndex = self.origSlideCount;
      self.sliderContent.style[self.cssPrefix + 'transform'] = self.getTranslateVal(self.slideSize * self.origSlideCount - 1);      
      self.sliderContent.style['transform'] = self.getTranslateVal(self.slideSize * self.origSlideCount - 1);      
    }else if (self.opts.slideIndex >= self.slides.length - 1) {
      self.opts.slideIndex = 1;
      self.sliderContent.style[self.cssPrefix + 'transform'] = self.getTranslateVal(self.slideSize);
      self.sliderContent.style['transform'] = self.getTranslateVal(self.slideSize);
    }

    return self.addActiveClass();
  }

};

Object.prototype.extendObj = function(orig, addition) {
  for (var i in orig) {
    for (var j in addition) {
      if (i === j) {
        orig[i] = addition[j];
      }
    }
  }
  return orig;
};
