// Refactored from; http://www.schillmania.com/content/projects/javascript-animation-3/

/**
 * Easing equations mainly used in animation to calculate tween frame values. Each method shares the same parameters and return value as below.
 * <div class="c-returns"><h5 class="c-returns__header">Returns</h5><code>Number</code><p>The tween value for the currentFrame.</p></div><h5>Parameters:</h5>
<table class="c-params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name">currentFrame</td>
<td class="type">
<code>Number</code>
</td>
<td class="description last"><p>The current frame</p></td>
</tr>
<tr>
<td class="name">startValue</td>
<td class="type">
<code>Number</code>
</td>
<td class="description last"><p>The start value of the number to be tweened</p></td>
</tr>
<tr>
<td class="name">valueChange</td>
<td class="type">
<code>Number</code>
</td>
<td class="description last"><p>The total ammount of change the tweened value will expierience over the length of its animation. For example if you're tween from 100 to 200 the <code>valueChange</code> would be 100.</p></td>
</tr>
<tr>
<td class="name">totalFrames</td>
<td class="type">
<code>Number</code>
</td>
<td class="description last"><p>The total number of tween frames.</p></td>
</tr>
</tbody>
</table>
 * 
 * @name  ish.easing
 * @namespace
 *
 */
$.easing = {
	/**
	 * @memberOf ish.easing
	 */
	linear: function(currentFrame, startValue, valueChange, totalFrames) {
		return valueChange * currentFrame / totalFrames + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeInQuad: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames;
		return valueChange * currentFrame * currentFrame + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeOutQuad: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames;
		return -valueChange * currentFrame * (currentFrame - 2) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeInOutQuad: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames / 2;
		if (currentFrame < 1) return valueChange / 2 * currentFrame * currentFrame + startValue;
		currentFrame--;
		return -valueChange / 2 * (currentFrame * (currentFrame - 2) - 1) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 * 
	 */
	easeInCubic: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames;
		return valueChange * currentFrame * currentFrame * currentFrame + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeOutCubic: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames;
		currentFrame--;
		return valueChange * (currentFrame * currentFrame * currentFrame + 1) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeInOutCubic: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames / 2;
		if (currentFrame < 1) return valueChange / 2 * currentFrame * currentFrame * currentFrame + startValue;
		currentFrame -= 2;
		return valueChange / 2 * (currentFrame * currentFrame * currentFrame + 2) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeInQuart: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames;
		return valueChange * currentFrame * currentFrame * currentFrame * currentFrame + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeOutQuart: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames;
		currentFrame--;
		return -valueChange * (currentFrame * currentFrame * currentFrame * currentFrame - 1) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeInOutQuart: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames / 2;
		if (currentFrame < 1) return valueChange / 2 * currentFrame * currentFrame * currentFrame * currentFrame + startValue;
		currentFrame -= 2;
		return -valueChange / 2 * (currentFrame * currentFrame * currentFrame * currentFrame - 2) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeInQuint: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames;
		return valueChange * currentFrame * currentFrame * currentFrame * currentFrame * currentFrame + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeOutQuint: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames;
		currentFrame--;
		return valueChange * (currentFrame * currentFrame * currentFrame * currentFrame * currentFrame + 1) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeInOutQuint: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames / 2;
		if (currentFrame < 1) return valueChange / 2 * currentFrame * currentFrame * currentFrame * currentFrame * currentFrame + startValue;
		currentFrame -= 2;
		return valueChange / 2 * (currentFrame * currentFrame * currentFrame * currentFrame * currentFrame + 2) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeInSine: function(currentFrame, startValue, valueChange, totalFrames) {
		return -valueChange * Math.cos(currentFrame / totalFrames * (Math.PI / 2)) + valueChange + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeOutSine: function(currentFrame, startValue, valueChange, totalFrames) {
		return valueChange * Math.sin(currentFrame / totalFrames * (Math.PI / 2)) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeInOutSine: function(currentFrame, startValue, valueChange, totalFrames) {
		return -valueChange / 2 * (Math.cos(Math.PI * currentFrame / totalFrames) - 1) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeInExpo: function(currentFrame, startValue, valueChange, totalFrames) {
		return valueChange *
			Math.pow(2, 10 * (currentFrame / totalFrames - 1)) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeOutExpo: function(currentFrame, startValue, valueChange, totalFrames) {
		return valueChange * (-
			Math.pow(2, -10 * currentFrame / totalFrames) + 1) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeInOutExpo: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames / 2;
		if (currentFrame < 1) return valueChange / 2 *
			Math.pow(2, 10 * (currentFrame - 1)) + startValue;
		currentFrame--;
		return valueChange / 2 * (-
			Math.pow(2, -10 * currentFrame) + 2) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeInCirc: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames;
		return -valueChange * (Math.sqrt(1 - currentFrame * currentFrame) - 1) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeOutCirc: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames;
		currentFrame--;
		return valueChange *
			Math.sqrt(1 - currentFrame * currentFrame) + startValue;
	},
	/**
	 * @memberOf ish.easing
	 */
	easeInOutCirc: function(currentFrame, startValue, valueChange, totalFrames) {
		currentFrame /= totalFrames / 2;
		if (currentFrame < 1) return -valueChange / 2 * (Math.sqrt(1 - currentFrame * currentFrame) - 1) + startValue;
		currentFrame -= 2;
		return valueChange / 2 * (Math.sqrt(1 - currentFrame * currentFrame) + 1) + startValue;
	}
};