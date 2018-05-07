import ranger from './ranger';

export default class Range {

  constructor(min = 0, max = 0, curve = ranger.LINEAR) {
    this.min = min;
    this.max = max;
    this.curve = curve;
  }

  fromSizeAndCenter(size, center = 0, curve = this.curve) {
    this.min = size * -0.5 + center;
    this.max = size * 0.5 + center;
    this.curve = curve;

    return this;
  }

  set(min, max, curve = this.curve) {
    this.min = min;
    this.max = max;
    this.curve = curve;

    return this;
  }

  setMin(min) {
    this.min = min;

    return this;
  }

  setMax(max) {
    this.max = max;

    return this;
  }

  setCurve(curve) {
    this.curve = curve;

    return this;
  }

  scale(s) {
    this.min *= s;
    this.max *= s;

    return this;
  }

  expand(d) {
    this.min -= d;
    this.max += d;

    return this;
  }

  contract(d) {
    this.min += d;
    this.max -= d;

    return this;
  }

  shift(d) {
    this.min += d;
    this.max += d;

    return this;
  }

  copy(range) {
    this.min = range.min;
    this.max = range.max;
    this.curve = range.curve;

    return this;
  }

  clone() {
    return new Range(this.min, this.max, this.curve);
  }

  isEmpty() {
    return this.min === this.max;
  }

  makeEmpty() {
    this.min = 0;
    this.max = 0;

    return this;
  }

  length() {
    return ranger.length(this.min, this.max);
  }

  getPosition(x, curve = this.curve) {
    return ranger.getPosition(x, this.min, this.max, curve)
  }

  getValue(x, curve = this.curve) {
    return ranger.getValue(x, this.min, this.max, curve);
  }

  map(x, range, curve = this.curve) {
    return ranger.map(x, range, this.min, this.max, curve);
  }

  mapFloats(x, min, max, curve = this.curve) {
    return ranger.mapFloat(x, min, max, this.min, this.max, curve);
  }

  random(curve = this.curve) {
    return ranger.random(this.min, this.max, curve);
  }

  randomInt(curve = this.curve) {
    return ranger.randomInt(this.min, this.max, curve);
  }

  divide(steps, curve = this.curve) {
    const values = [];

    for (let i = 0; i < steps; i++) {
      values[i] = this.getValue(i / (steps - 1), curve);
    }

    return values;
  }

  clamp(x) {
    return ranger.clamp(x, this.min, this.max);
  }

  wrap(x) {
    return ranger.wrap(x, this.min, this.max);
  }

  contains(x) {
    return ranger.contains(x, this.min, this.max);
  }

  containsRange(range) {
    return ranger.containsRange(range, this.min, this.max);
  }
}
