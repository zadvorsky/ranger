/**
 * @namespace
 */
const ranger = {

  /**
   * Default curve, which is just a pass-through function.
   *
   * @param {number} x
   * @returns {number}
   */
  LINEAR: x => x,

  // measurements

  /**
   * Calculates the length of a range, or just (max - min). Used internally.
   * No validation is performed to check if the range is valid (max >= min).
   *
   * @param {number} min - Min value of the range.
   * @param {number} max - Max value of the range.
   * @returns {number} Length of the range.
   */
  length(min, max) {
    return max - min;
  },

  /**
   * A range is valid if max >= min.
   *
   * @param {number} min - Min value of the range.
   * @param {number} max - Max value of the range.
   * @returns {boolean}
   */
  isValid(min, max) {
    return max >= min;
  },

  /**
   * Returns the position of a value in the range, as a float 0.0 and 1.0.
   * The supplied value is not clamped. If it's out of bounds, the returned position will be proportionally out of bounds.
   *
   * @param {number} x - The value to check.
   * @param {number} min - Min value of the range.
   * @param {number} max - Max value of the range.
   * @param {function} [curve] - The curve function to apply.
   * @returns {number} - Position of the supplied value.
   */
  getPosition(x, min, max, curve = ranger.LINEAR) {
    return curve((x - min) / ranger.length(min, max));
  },

  /**
   * Returns the value at a given position in the rage.
   * The returned value is not clamped.
   *
   * @param {number} x - The position to check. Should be between 0.0 and 1.0.
   * @param {number} min - Min value of the range.
   * @param {number} max - Max value of the range.
   * @param {function} [curve] - The curve function to apply.
   * @returns {*} - Value at the supplied position.
   */
  getValue(x, min, max, curve = ranger.LINEAR) {
    return min + curve(x) * ranger.length(min, max);
  },

  // mapping

  /**
   * Maps a value from one range to a value from another range at the same position.
   * The source range is sampled linearly.
   * None of the values are clamped.
   *
   * @param {number} x - The value to map. Should be contained in sourceRange.
   * @param {Range} sourceRange - The range to map from.
   * @param {Range} targetRange - The range to map to.
   * @param {function} [curve] - The curve function to apply to the targetRange.
   * @returns {Number} - The mapped value, between targetRange.min and targetRange.max.
   */
  map(x, sourceRange, targetRange, curve = ranger.LINEAR) {
    return ranger.getValue(sourceRange.getPosition(x, ranger.LINEAR), targetRange.min, targetRange.max, curve);
  },

  /**
   * Same as map, but the source and target ranges should be provided as numbers.
   *
   * @see map
   *
   * @param {number} x - The value to map. Should be contained in the source range.
   * @param {number} sourceMin - Min value for the source range.
   * @param {number} sourceMax - Max value for the source range.
   * @param {number} targetMin - Min value for the target range.
   * @param {number} targetMax - Max value for the target range.
   * @param {function} [curve] - The curve function to apply to the target range.
   * @returns {number} - The mapped value, between targetMin and targetMax.
   */
  mapFloat(x, sourceMin, sourceMax, targetMin, targetMax, curve = ranger.LINEAR) {
    return ranger.getValue(ranger.getPosition(x, sourceMin, sourceMax, ranger.LINEAR), targetMin, targetMax, curve);
  },

  // random

  /**
   * Returns a random float between min and max.
   *
   * @param {number} min - Min value of the range.
   * @param {number} max - Max value of the range.
   * @param {function} [curve] - The curve function to apply.
   * @returns {number}
   */
  random(min, max, curve = ranger.LINEAR) {
    return min + curve(Math.random()) * ranger.length(min, max);
  },

  /**
   * Returns a random int between min and max.
   * The returned value is floored, so it will never equal max.
   *
   * @param {number} min - Min value of the range.
   * @param {number} max - Max value of the range.
   * @param {function} [curve] - The curve function to apply.
   * @returns {number}
   */
  randomInt(min, max, curve = ranger.LINEAR) {
    return ranger.random(min, max, curve) | 0;
  },

  // common operations

  /**
   * Returns min if x < min.
   * Returns max if x > max.
   * Returns x otherwise.
   *
   * @param {number} x - The value to check.
   * @param {number} min - Min value of the range.
   * @param {number} max - Max value of the range.
   * @returns {number} - The clamped value.
   */
  clamp(x, min, max) {
    return x < min ? min : x > max ? max : x;
  },

  /**
   * Wraps a value around the range.
   * This is similar to the modulo operator, but for arbitrary ranges.
   *
   * @param {number} x - The value to wrap.
   * @param {number} min - Min value of the range.
   * @param {number} max - Max value of the range.
   * @returns {number} - The wrapped value.
   */
  wrap(x, min, max) {
    const l = ranger.length(min, max);

    return (((x - min) % l) + l) % l + min;
  },

  /**
   * Checks if a value is inside the range.
   *
   * @param {number} x - The value to check.
   * @param {number} min - Min value of the range.
   * @param {number} max - Max value of the range.
   * @returns {boolean}
   */
  contains(x, min, max) {
    return x >= min && x <= max;
  },

  /**
   * Checks if the source range is contained in the target range.
   *
   * @param {Range} sourceRange - The range to check.
   * @param {Range} targetRange - The range the sourceRange will be compared to.
   * @returns {boolean}
   */
  containsRange(sourceRange, targetRange) {
    return ranger.contains(sourceRange.min, targetRange.min, targetRange.max) && ranger.contains(sourceRange.max, targetRange.min, targetRange.max);
  },
};

export default ranger;