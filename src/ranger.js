const ranger = {

  LINEAR: v => v,

  // measurements
  
  length(min, max) {
    return max - min;
  },
  
  getPosition(x, min, max, curve = ranger.LINEAR) {
    return curve((x - min) / ranger.length(min, max));
  },
  
  getValue(x, min, max, curve = ranger.LINEAR) {
    return min + curve(x) * ranger.length(min, max);
  },

  // mapping

  map(x, range, min, max, curve = ranger.LINEAR) {
    return ranger.getValue(range.getPosition(x, ranger.LINEAR), min, max, curve);
  },

  mapFloat(x, fromMin, fromMax, toMin, toMax, curve = ranger.LINEAR) {
    return ranger.getValue(ranger.getPosition(x, fromMin, fromMax, ranger.LINEAR), toMin, toMax, curve);
  },

  // random

  random(min, max, curve = ranger.LINEAR) {
    return min + curve(Math.random()) * ranger.length(min, max);
  },

  randomInt(min, max, curve) {
    return ranger.random(min, max, curve) | 0;
  },

  // common operations

  clamp(x, min, max) {
    return x < min ? min : x > max ? max : x;
  },

  wrap(x, min, max) {
    const l = ranger.length(min, max);

    return (((x - min) % l) + l) % l + min;
  },

  contains(x, min, max) {
    return x >= min && x <= max;
  },

  containsRange(range, min, max) {
    return ranger.contains(range.min, min, max) && ranger.contains(range.max, min, max);
  },
};

export default ranger;