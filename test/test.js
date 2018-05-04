const assert = require('assert');
const ranger = require('..');
const { Range } = require('..');

const range1 = new Range(0, 1);

assert.equal(range1.isEmpty(), false);

range1.makeEmpty();

assert.equal(range1.isEmpty(), true);
