'use strict';
/**
 * otobox - Simple and fast JavaScript/HTML5 library to create autocomplete inputs
 *
 * Afshin Mehrabani [@afshinmeh]
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals
    root.lepsSlider = factory();
  }
}(this, function () {

  /**
   * To init basic settings and variables
   */
  function _init (config) {
    /**
     * Default options
     */
    var defaults = {
      /* value key */
      wrapper: '#lep-slider',
      animation: "fade",              // {string} - fade or slide
      easing: "ease",                 // {string} - Determines the easing method used in transitions. cubic buizier for example
      direction: 'ltr',               // {string} - rtl or ltr. defines the dirction of accending slide
      animationLoop: true,            // {boolean} - defines if animation will start from 1st slide after finished in last slide
      autoSlide: true,                // {boolean} - slide automatically or manually. if false, at least 1 navigator menu shold be present
      animationSpeed: 600,            // {number} - animation duration of each slide
      initDelay: 0,                   // {number} - delay of starting first slideShow in miliseconds
      slideDelay: 0,                   // {number} - delay of animation of each slide in milisecond
      randomize: false,               // {boolean}: Randomize slide order

      // Usability features
      pauseOnHover: false,            // {boolean} - pause slide show while oiinter is inside slider

      // Primary Controls
      navigators: true,               // {boolean} - Create navigation for paging control of each clide? Note: Leave true for manualControls usage
      navigatorsContainer: "",        // {string} - Custom css class name to be added to Navigation menu
      directionNav: true,             // {boolean} - Create navigation for previous/next navigation? (true/false)
      pasueButton: true,              // {boolean} - Show pause button
      prevText: "Previous",           // {string} - Set the text for the "previous" directionNav item
      nextText: "Next",               // {string} - Set the text for the "next" directionNav item

      // Maual navigation
      keyboard: true,                 // {boolean} - Allow slider navigating via keyboard left/right keys

      // Carousel Options
      itemWidth: 0,                   // {nteger} - Box-model width of individual carousel items, including horizontal borders and padding.
      itemMargin: 0,                  // {nteger} - Margin between carousel items.
      minItems: 0,                    // {nteger} - Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
      maxItems: 0,                    // {nteger} - Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    };

    this._options = _merge(defaults, config);

    // construct intial HTML structure
    _construct.call(this);
  };// end of init

  /**
   * @name merge
   * @summary merges two given objects and returned the result
   *
   **/
  function _merge (obj1, obj2) {
    var obj = {};

    for (var x1 in obj1) {
      if (obj1.hasOwnProperty(x1)) {
        obj[x1] = obj1[x1];
      }
    }

    for (var x2 in obj2) {
      if (obj2.hasOwnProperty(x2) && x2 != '$attr' && x2 != '$$element') {
        obj[x2] = obj2[x2];
      }
    }
    return obj;
  };

  /**
   * @name trim
   * @summary removes non blank spaces from both sides of string
   *
   **/
  function _trim (str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  /**
   * @name hasClass
   * @summary checks if given elemen has the given className
   *
   **/
  function _hasClass (element, className) {
    if (element != undefined && element.className) {
      return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    } else {
      return false;
    }
  }

  /**
   * @name addClass
   * @summary adds given className to given element
   *
   **/
  function _addClass (element, className) {
    if (element != undefined && !_hasClass(element, className)) {
      element.className += " " + className;
      element.className = _trim(element.className);
    }
  }

  /**
   * @name removeClass
   * @summary removes given className from given element
   *
   **/
  function _removeClass (element, className) {
    if (element != undefined) {
      if (_hasClass(element, className)) {
          var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
          element.className = element.className.replace(reg, ' ');
      }
      element.className = _trim(element.className);
    }
  }

  /**
   * @name construct
   * @summary creates intial html structure of slider
   * @param config {object} - options of slider
   **/
  function _construct (config) {
    this.wrapperElement = document.querySelector(this._options.wrapper);
    if (this.wrapperElement == undefined) {
      _error('Wrapper element is mandatory for slider, define it in config or use #lep-slider');
    }

    // adding css class
    _addClass(this.wrapperElement, 'lep-slider-wrapper');
    // defining transision according to optons
    this.wrapperElement.setAttribute('style', 'transition: transform ' + this._options.easing + ' '  + this._options.animationSpeed + 'ms;' +
                                              '-webkit-transition: transform ' + this._options.easing + ' '  + this._options.animationSpeed + 'ms;' +
                                              '-moz-transition: transform ' + this._options.easing + ' '  + this._options.animationSpeed + 'ms;' +
                                              '-ms-transition: transform ' + this._options.easing + ' '  + this._options.animationSpeed + 'ms;');

    var slideElements = (this._options.slide) ? this.wrapperElement.querySelectorAll(this._options.slide) : this.wrapperElement.children;

    // create a container element, this is what we are to move it inside wrapper
    this.slidesContainer = document.createElement('div');
    this.slidesContainer.className = 'slides-container';
    this.wrapperElement.appendChild(this.slidesContainer);

    // append children to container
    // wrapping elemnts by reference prvents loosing listeners already bound to elements
    var length = slideElements.length;
    this._options.slideWidth = 100 / length;
    for (var i = 0; i < length; i++) {
      if (slideElements[0] != this.slidesContainer && slideElements[0] != undefined) {
        _addClass(slideElements[0], 'slide-item');
        slideElements[0].style.width = this._options.slideWidth + '%';
        this.slidesContainer.appendChild(slideElements[0]);
      }
    }

    this.slideElements = this.slidesContainer.children;

    // setting with of items manually
    this.slidesContainer.style.width = (100 * length) + '%';

    if (this._options.navigators) {
      _addNavigators.call(this);
    }


  }

  /**
   * @name hasCssFeature
   * @summary checks if current browser supports given feature or not
   * thanks to [Daniel](http://stackoverflow.com/users/389410/daniel)
   * @param config {object} - options of slider
   **/
   function _hasCssFeature(featurename) {
    var feature = false,
    domPrefixes = 'Webkit Moz ms O'.split(' '),
    elm = document.createElement('div'),
    featurenameCapital = null;

    featurename = featurename.toLowerCase();

    if( elm.style[featurename] !== undefined ) { feature = true; } 

    if( feature === false ) {
      featurenameCapital = featurename.charAt(0).toUpperCase() + featurename.substr(1);
      for( var i = 0; i < domPrefixes.length; i++ ) {
        if( elm.style[domPrefixes[i] + featurenameCapital ] !== undefined ) {
          feature = true;
          break;
        }
      }
    }
    return feature; 
  }

  /**
   * @name _previous
   * @summary navigate to previous slide
   *
   **/
  function _previous () {
    _goTo.call(this, this._options.currentSlide - 1)
  }

  /**
   * @name _next
   * @summary navigate to next slide
   *
   **/
  function _next () {
    _goTo.call(this, this._options.currentSlide + 1)
  }


  function _manualGoTo () {

  }
  /**
   * @name _goTo
   * @summary navigate to given slide number
   * this will navigate to last slide if index is greater than slide numbers
   * and also to first slide if index is zero
   * @param index {number} - the index of target slide in the slidesContainer
   **/
  function _goTo (index) {
    // normilizing index
    // @todo check loop or one directional
    if (index >= this.slideElements.length) {
      _warn('Provided index greater than number of existing slides. navigating to last slide instead.');
      index = this.slideElements.length - 1;
    } else if (index < 0) {
      _warn('Provided a negative index. navigating to first slide instead.');
      index = 0;
    }

    this._options.currentSlide = index;

    // navigating
    // checking if browser supports transtion otherwise use left property with JS animation
    if (_hasCssFeature('transition')) {
      //@todo add fade animation
      this.slidesContainer.setAttribute('style', 'width: '+ this.slidesContainer.style.width +
                                                  ';transform: translateX(-' + index * this._options.slideWidth + '%);' + 
                                                  '-webkit-transform: translateX(-' + index * this._options.slideWidth + '%);' + 
                                                  '-moz-transform: translateX(-' + index * this._options.slideWidth + '%);' + 
                                                  '-ms-transform: translateX(-' + index * this._options.slideWidth + '%;)');
    // using JS animation
    // for cases not supporting transition
    } else {
      //@todo add JS fallback
    }


  }

  /**
   * @name _addNavigators
   * @summary navigate to given slide number
   * this will navigate to last slide if index is greater than slide numbers
   * and also to first slide if index is zero
   * @param index {number} - the index of target slide in the slidesContainer
   **/
  function _addNavigators () {
    // generating navigators menu
    var navigators = document.createElement('nav');
    var navigatorsContainer = document.createElement('ul');

    navigators.appendChild(navigatorsContainer);

    // appending points to navigator
    for (var i = 0; i < this.slideElements.length; i++) {
      var point = document.createElement('li');
      point.onclick = _manualGoTo;
      navigatorsContainer.appendChild(point);
    }

    // appending navigators menu to slider rapper
    this.wrapperElement.appendChild(navigators);

  }
  // addControllers
  // createIndicators
  // startSlideshow
  // stopSlideshow
  // push slide


  /**
   * @name error
   * @summary throws error
   *
   **/
  function _error (msg) {
    throw new Error('leps sldier - ' + msg);
  };

  /**
   * @name warn
   * @summary loggs a warn in console
   *
   **/
  function _warn (msg) {
    console.warn('leps sldier - ' + msg);
  };





  /* constructor */
  var lepsSlider = function (config) {
    _init.call(this, config);
  };

  lepsSlider.prototype = {
    setOption: function (option, value) {
      // @todo check options to be valid
      this._options[option] = value;
      return this;
    },
    setOptions: function (options) {
      if (typeof options != 'object' || options == undefined) {
        _warn('No options provided');
        return false;
      } else {
        this._options = _merge(this._options, options);
        return this;
      }
    },
    previous: function () {
      _previous.call(this);
      return this;
    },
    next: function () {
      _next.call(this);
      return this;
    },
    goTo: function (index) {
      _goTo.call(this, index);
      return this;
    }
  };

  return lepsSlider;
}));