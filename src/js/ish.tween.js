// SINGELTON
var tweener = function() {
	var intervalRate = 0.06; // 60FPS.

	this.queue = [];
	this.queueHash = [];
	this.active = false;
	this.timer = null;

	this.createTween = function(start, end, frameCount, easingfn) {
		// return array of tween coordinate data (start->end)
		var tween = [start];
		var diff = end - start;
		for (var i = 0; i < frameCount; i++) {
			tween[i] = {};
			var valueChange = tween[i - 1] ? tween[i - 1].data : 0;

			// if it's the last frame use the end value or else pass it through the easing functions.
			tween[i].data = i === frameCount - 1 ? end : $.fn.easing[easingfn](i, start, diff, frameCount);
			tween[i].event = null;
		}
		return tween;
	};

	this.enqueue = function(o, fMethod, fOnComplete) {
		// add object and associated methods to animation queue
		this.queue.push(o);
		o.active = true;
	};

	this.start = function() {
		if (this.timer || this.active) return false; // animator.start(): already active
		// animator.start() : only if started
		this.active = true;
		this.timer = setInterval(animate, 1 / intervalRate);
	};

	this.clear = function() {
		// reset some things, clear for next batch of animations
		clearInterval(this.timer);
		this.timer = null;
		this.active = false;
		this.queue = [];
	};

	var animate = function() {
		var active = 0;
		for (var i = 0, j = this.queue.length; i < j; i++) {
			if (this.queue[i].active) {
				//console.log(this.queue[i]);
				this.queue[i].nextFrame();
				active++;
			}
		}
		if (active === 0 && this.timer) {
			// all animations finished
			this.clear();
		}
	}.bind(this);

	return this;
}.call({});

/**
 * Tweens values between two points to be used in Javascript animation. Animation works a little differently to jQuery's animat() method, this simply provides callback functions that fires on a timer and provides parameters for that tweens frames animation values. You can then write your own CSS manipulation routine within the callbacks. 
 * @name  ish.tween
 * @constructor
 * @param {Object} options
 * @param {Number} options.from The start value of the tween.
 * @param {Number} options.to The end value of the tween.
 * @param {String} options.easing Specify an easing equation for the tween.
 * @param {Function} options.onBeforeTween A callback function fired before each tween begins. 
 * @param {Function} options.onTween A callback function fired each tween frame.
 * @param {Function} options.onComplete A callback function fired when the tween is complete.
 * @return {ish.tween} Chainable, returns the module instance.
 * @example
 * var animateOpacity = $.tween({
 *   from: 1,
 *   to: 0,
 *   duration: 1000,
 *   easing: 'linear',
 *   onBeforeTween: function (){
 *   	//onBeforeTween operations
 *   },
 *   ontween: function (value){
 *   	ish('.selector').css('opacity', value)
 *   },
 *   oncomplete: function (){ 
 *   	//onComplete operations
 *   }
 * }).start();
 */
var tween = function(animationParams) {

	/*
	animationParams = {
	from: 200,
	to: 300,
	easing: 'default',
	ontween: function(value) { ... }, // method called each time
	oncomplete: function() { ... } // when finished
	}
	*/
	if (typeof animationParams.easing == 'undefined') {
		animationParams.easing = 'default';
	}
	var onBeforeTween = (animationParams.onBeforeTween || null);
	var ontween = (animationParams.ontween || null);
	var oncomplete = (animationParams.oncomplete || null);

	var time = (animationParams.duration || 500);
	var fps = (1 / animationParams.fps || 1 / 0.06);
	/**
	 * The number of frames.
	 * @memberOf ish.tween
	 */
	var frameCount = Math.ceil(time / fps);
	//var delta = (animationParams.to - animationParams.from) / time / 0.06;
	//var delta = 100 / frameCount;
	var easingfn = (animationParams.easing || 'linear');
	var tween = tweener.createTween(animationParams.from, animationParams.to, frameCount, easingfn);

	/**
	 * The current frame number.
	 * @memberOf ish.tween
	 */
	this.frame = 0;
	/**
	 * If the tween is animating.
	 * @memberOf ish.tween
	 */
	this.active = false;

	/**
	 * Moves the tween to the next frame or the specified interval.
	 * @memberOf ish.tween
	 * @param {Int} frameNumber The frame number you wish to skip to.
	 * @return {ish.tween}     Chainable, returns the module instance. 
	 * @example
	 * animateOpacity.start();
	 * animateOpacity.stop();
	 * 
	 * // move to the next frame
	 * animateOpacity.nextFrame();
	 * // skip to a specific tween frame
	 * animateOpacity.nextFrame(500);
	 *    
	 */
	this.nextFrame = function(frameNumber) {
		// generic animation method
		if (this.active) {
			if (ontween && tween[this.frame]) ontween(tween[this.frame].data);

			if (this.frame++ >= frameCount - 1) {
				this.active = false;
				this.frame = 0;
				if (oncomplete) oncomplete();
			}
		}
		return this;
	};

	/**
	 * Starts the tween.
	 * @memberOf ish.tween
	 * @return {ish.tween}     Chainable, returns the module instance.
	 * @example
	 * animateOpacity.start();
	 */
	this.start = function() {
		//console.log('Animation  this.start');
		if (onBeforeTween) onBeforeTween();
		// add this to the main animation queue
		tweener.enqueue(this, this.nextFrame, oncomplete);
		if (!tweener.active) tweener.start();
		return this;
	};

	/**
	 * Stops the tween.
	 * @memberOf ish.tween
	 * @param {Boolean} skipToEnd Set to true to end the tween.  
	 * @return {ish.tween} Chainable, returns the module instance.
	 * @example
	 * // stop the animation at the current frame.
	 * animateOpacity.stop();
	 * // stop the animation and skip to the end of the tween.
	 * animateOpacity.stop(true);
	 * 
	 */
	this.stop = function(skipToEnd) {
		if (skipToEnd) {
			this.frame = frameCount - 1;
			this.nextFrame();
		} else {
			this.active = false;
		}
		return this;
	};

	// return publics
	return this;
};
$.tween = function(animationParams) {
	return tween.call({}, animationParams);
};