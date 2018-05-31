(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ranger = factory());
}(this, (function () { 'use strict';

  /**
   * @namespace
   */
  var ranger = {

    /**
     * Default curve, which is just a pass-through function.
     *
     * @param {number} x
     * @returns {number}
     */
    LINEAR: function LINEAR(x) {
      return x;
    },

    // measurements

    /**
     * Calculates the length of a range, or just (max - min). Used internally.
     * No validation is performed to check if the range is valid (max >= min).
     *
     * @param {number} min - Min value of the range.
     * @param {number} max - Max value of the range.
     * @returns {number} Length of the range.
     */
    length: function length(min, max) {
      return max - min;
    },


    /**
     * A range is valid if max >= min.
     *
     * @param {number} min - Min value of the range.
     * @param {number} max - Max value of the range.
     * @returns {boolean}
     */
    isValid: function isValid(min, max) {
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
    getPosition: function getPosition(x, min, max) {
      var curve = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ranger.LINEAR;

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
    getValue: function getValue(x, min, max) {
      var curve = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ranger.LINEAR;

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
    map: function map(x, sourceRange, targetRange) {
      var curve = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ranger.LINEAR;

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
    mapFloat: function mapFloat(x, sourceMin, sourceMax, targetMin, targetMax) {
      var curve = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : ranger.LINEAR;

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
    random: function random(min, max) {
      var curve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ranger.LINEAR;

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
    randomInt: function randomInt(min, max) {
      var curve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ranger.LINEAR;

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
    clamp: function clamp(x, min, max) {
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
    wrap: function wrap(x, min, max) {
      var l = ranger.length(min, max);

      return ((x - min) % l + l) % l + min;
    },


    /**
     * Checks if a value is inside the range.
     *
     * @param {number} x - The value to check.
     * @param {number} min - Min value of the range.
     * @param {number} max - Max value of the range.
     * @returns {boolean}
     */
    contains: function contains(x, min, max) {
      return x >= min && x <= max;
    },


    /**
     * Checks if the source range is contained in the target range.
     *
     * @param {Range} sourceRange - The range to check.
     * @param {Range} targetRange - The range the sourceRange will be compared to.
     * @returns {boolean}
     */
    containsRange: function containsRange(sourceRange, targetRange) {
      return ranger.contains(sourceRange.min, targetRange.min, targetRange.max) && ranger.contains(sourceRange.max, targetRange.min, targetRange.max);
    }
  };

  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  /**
   * Creates a new Range instance with a min, max, and curve for repeated use.
   * No validation is performed to check if min is less or equal to max.
   *
   * @class
   * @constructor
   */

  var Range = function () {
    /**
     * Creates a new Range instance with a min, max, and curve for repeated use.
     * No validation is performed to check if min is less or equal to max.
     *
     * @param {number} min - Min value for this range.
     * @param {number} max - Max value for this range.
     * @param {function} [curve] - The curve function to apply by default.
     */
    function Range() {
      var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var curve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ranger.LINEAR;

      _classCallCheck(this, Range);

      /**
       * Min value for this range
       * @type {number}
       */
      this.min = min;
      /**
       * Max value for this range
       * @type {number}
       */
      this.max = max;
      /**
       * The curve used by this range.
       * This should be a function that takes a number (0.0 to 1.0), and returns a transformed number.
       * @type {Function}
       */
      this.curve = curve;
    }

    /**
     * Sets this range min and max based on a size and a center.
     * Min will be set to size * -0.5 + center.
     * Max will be set to size * 0.5 + center.
     *
     * @param {Number} size - The total size of the range.
     * @param {Number} [center=0] - The center of the range. Defaults to 0.
     * @param {function} [curve] - The curve function to apply by default.
     * @returns {Range}
     */


    _createClass(Range, [{
      key: 'fromSizeAndCenter',
      value: function fromSizeAndCenter(size) {
        var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var curve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.curve;

        this.min = size * -0.5 + center;
        this.max = size * 0.5 + center;
        this.curve = curve;

        return this;
      }

      /**
       * Sets the min, max, and curve for this range.
       *
       * @param {number} min - Min value for this range.
       * @param {number} max - Max value for this range.
       * @param {function} [curve] - The curve function to apply by default.
       * @returns {Range}
       */

    }, {
      key: 'set',
      value: function set() {
        var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.min;
        var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.max;
        var curve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.curve;

        this.min = min;
        this.max = max;
        this.curve = curve;

        return this;
      }

      /**
       * Sets the min value for this range. This method mostly exists for chaining.
       *
       * @param {number} min - Min value for this range.
       * @returns {Range}
       */

    }, {
      key: 'setMin',
      value: function setMin(min) {
        this.min = min;

        return this;
      }

      /**
       * Sets the max value for this range. This method mostly exists for chaining.
       *
       * @param {number} max - Max value for this range.
       * @returns {Range}
       */

    }, {
      key: 'setMax',
      value: function setMax(max) {
        this.max = max;

        return this;
      }

      /**
       * Sets the default curve for this range. This method mostly exists for chaining.
       *
       * @param {function} curve - The curve function to apply by default.
       * @returns {Range}
       */

    }, {
      key: 'setCurve',
      value: function setCurve(curve) {
        this.curve = curve;

        return this;
      }

      /**
       * Multiplies this range's min and max with the given scalar.
       * Values below 1.0 will make the range smaller.
       * Values over 1.0 will make it bigger.
       *
       * @param {number} s - The scalar to use.
       * @returns {Range}
       */

    }, {
      key: 'scale',
      value: function scale(s) {
        this.min *= s;
        this.max *= s;

        return this;
      }

      /**
       * Expands this range by a given delta.
       * The delta is subtracted from this.min, and added to this.max.
       *
       * @param {Number} d - The delta to expand this range by.
       * @returns {Range}
       */

    }, {
      key: 'expand',
      value: function expand(d) {
        this.min -= d;
        this.max += d;

        return this;
      }

      /**
       * Contracts this range by a given delta.
       * The delta is added to this.min, and subtracted from this.max.
       *
       * @param {number} d - The delta to contract this range by.
       * @returns {Range}
       */

    }, {
      key: 'contract',
      value: function contract(d) {
        this.min += d;
        this.max -= d;

        return this;
      }

      /**
       * Shifts this range by a given delta.
       * The delta is added to this.min and this.max.
       *
       * @param {number} d - The delta to shift this range by.
       * @returns {Range}
       */

    }, {
      key: 'shift',
      value: function shift(d) {
        this.min += d;
        this.max += d;

        return this;
      }

      /**
       * Copies another range's min, max, and curve into this one.
       * The curve is passed by reference.
       *
       * @param {Range} range - The range to copy from.
       * @returns {Range}
       */

    }, {
      key: 'copy',
      value: function copy(range) {
        this.min = range.min;
        this.max = range.max;
        this.curve = range.curve;

        return this;
      }

      /**
       * Creates a shallow copy of this range.
       *
       * @returns {Range}
       */

    }, {
      key: 'clone',
      value: function clone() {
        return new Range(this.min, this.max, this.curve);
      }

      /**
       * Checks if this range is empty.
       * A range is empty if its min === max.
       *
       * @returns {boolean}
       */

    }, {
      key: 'isEmpty',
      value: function isEmpty() {
        return this.min === this.max;
      }

      /**
       * Sets this range's min and max to 0.
       *
       * @returns {Range}
       */

    }, {
      key: 'makeEmpty',
      value: function makeEmpty() {
        this.min = 0;
        this.max = 0;

        return this;
      }

      /**
       * @see ranger.length
       * @returns {number}
       */

    }, {
      key: 'length',
      value: function length() {
        return ranger.length(this.min, this.max);
      }

      /**
       * @see ranger.getPosition
       *
       * @param {number} x - The value to check.
       * @param {function} [curve] - The curve function to apply. Overrides the default set for this range.
       * @returns {number}
       */

    }, {
      key: 'getPosition',
      value: function getPosition(x) {
        var curve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.curve;

        return ranger.getPosition(x, this.min, this.max, curve);
      }

      /**
       * @see ranger.getValue
       *
       * @param {number} x - The position to check. Should be between 0.0 and 1.0.
       * @param {function} [curve] - The curve function to apply. Overrides the default set for this range.
       * @returns {number}
       */

    }, {
      key: 'getValue',
      value: function getValue(x) {
        var curve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.curve;

        return ranger.getValue(x, this.min, this.max, curve);
      }

      /**
       * @see ranger.map
       *
       * @param {number} x - The value to map. Should be contained in sourceRange.
       * @param {Range} range - The range to map from.
       * @param {function} [curve] - The curve function to apply. Overrides the default set for this range.
       * @returns {Number}
       */

    }, {
      key: 'map',
      value: function map(x, range) {
        var curve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.curve;

        return ranger.map(x, range, this, curve);
      }

      /**
       * @see ranger.mapFloat
       *
       * @param {number} x - The value to map. Should be contained in the source range.
       * @param {number} min - Min value for the source range.
       * @param {number} max - Max value for the source range.
       * @param {function} [curve] - The curve function to apply. Overrides the default set for this range.
       * @returns {number}
       */

    }, {
      key: 'mapFloat',
      value: function mapFloat(x, min, max) {
        var curve = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.curve;

        return ranger.mapFloat(x, min, max, this.min, this.max, curve);
      }

      /**
       * @see ranger.random
       *
       * @param {function} [curve] - The curve function to apply. Overrides the default set for this range.
       * @returns {number}
       */

    }, {
      key: 'random',
      value: function random() {
        var curve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.curve;

        return ranger.random(this.min, this.max, curve);
      }

      /**
       * @see ranger.randomInt
       *
       * @param {function} [curve] - The curve function to apply. Overrides the default set for this range.
       * @returns {number}
       */

    }, {
      key: 'randomInt',
      value: function randomInt() {
        var curve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.curve;

        return ranger.randomInt(this.min, this.max, curve);
      }

      /**
       * Creates an array of values spread inside this range.
       * Values are inclusive, ie values[0] === this.min, and values[values.length - 1] === this.max.
       *
       * @param {number} count - Number of values (slices) to create. Should be >= 2.
       * @param {function} [curve] - The curve function to apply. Overrides the default set for this range.
       * @returns {number[]}
       */

    }, {
      key: 'slice',
      value: function slice(count) {
        var curve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.curve;

        if (count < 2) return [this.min, this.max];

        var values = [];

        for (var i = 0; i < count; i++) {
          values[i] = this.getValue(i / (count - 1), curve);
        }

        return values;
      }

      /**
       * Divides this range into a number of smaller ranges.
       * Each range will copy this range's curve.
       *
       * todo: add support for margin and padding.
       *
       * @param {number} count - The number of sub-ranges to create.
       * @param {function} [curve] - The curve function to apply. Overrides the default set for this range.
       * @returns {Range[]}
       */

    }, {
      key: 'divide',
      value: function divide(count) {
        var curve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.curve;

        if (count <= 1) return [this.clone()];

        var ranges = [];

        for (var i = 0; i < count; i++) {
          var min = this.getValue(i / count);
          var max = this.getValue((i + 1) / count);

          ranges[i] = new Range(min, max, this.curve);
        }

        return ranges;
      }

      /**
       * @see ranger.clamp
       *
       * @param {number} x - The value to check.
       * @returns {number}
       */

    }, {
      key: 'clamp',
      value: function clamp(x) {
        return ranger.clamp(x, this.min, this.max);
      }

      /**
       * @see ranger.wrap
       *
       * @param {number} x - The value to wrap.
       * @returns {number}
       */

    }, {
      key: 'wrap',
      value: function wrap(x) {
        return ranger.wrap(x, this.min, this.max);
      }

      /**
       * @see ranger.contains
       *
       * @param {number} x - The value to check.
       * @returns {boolean}
       */

    }, {
      key: 'contains',
      value: function contains(x) {
        return ranger.contains(x, this.min, this.max);
      }

      /**
       * @see ranger.containsRange
       *
       * @param {Range} range - The range to check.
       * @returns {boolean}
       */

    }, {
      key: 'containsRange',
      value: function containsRange(range) {
        return ranger.containsRange(range, this);
      }
    }]);

    return Range;
  }();

  ranger.Range = Range;

  return ranger;

})));
