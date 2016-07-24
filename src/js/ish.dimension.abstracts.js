/**
 * Gets the height of the first element in the supplied `ishObject`. This method is an abstraction of `ishObject.dimension`.
 * @name  ishObject.height
 * @function
 * @param  {Boolean} margins      Include margins in the return result.
 * @param  {Boolean} clientHeight Exclude the horizontal scrollbars height from the result.
 * @return {Integer}              The height of the element.
 * @example
 * ish('selector').height();
 */
ishObject.height = function(margins, clientHeight) {
	return this.dimension('height', margins, clientHeight);
};
/**
 * Gets the width of the first element in the supplied `ishObject`. This method is an abstraction of `ishObject.dimension`.
 * @name  ishObject.width
 * @function
 * @param  {Boolean} margins      Include margins in the return result.
 * @param  {Boolean} clientHeight Exclude the horizontal scrollbars height from the result.
 * @return {Integer}              The height of the element.
 * @example
 * ish('selector').width();
 */
ishObject.width = function(margins, clientWidth) {
	return this.dimension('width', margins, clientWidth);
};