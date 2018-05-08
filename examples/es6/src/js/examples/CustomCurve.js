import ranger, { Range } from "../../../../../dist/ranger.esm";
import BaseExample from "./BaseExample";
import rectFactory from "../factories/rectFactory";
import circleFactory from "../factories/circleFactory";

const customCurve = (x, e) => {
  return Math.pow(Math.cos(Math.PI * x * 0.5), e);
};

export default class CustomCurve extends BaseExample {

  description = '[wip] The radius curve uses a curve that is ~0 at 0, 1.0 at 0.5, and ~0 at 1.0.';

  state = {
    curveExponent: 0.5
  };

  createOptions() {
    this.createRangeInput('curveExponent', 'curve exponent', 0.1, 10, 0.1);
  }

  createGraphics() {
    // create a range between 0 and canvas width for x positions
    const xRange = new Range(0, this.size.width).contract(10);
    // create a range between 0 and canvas height for y positions
    const yRange = new Range(0, this.size.height).contract(10);

    const rRange = new Range(0, 24, x => customCurve(x * 2 - 1, this.state.curveExponent));

    const count = 12;

    for (let i = 0; i < count; i++) {
      const x = xRange.mapFloat(i, 0, count - 1);
      const y = yRange.mapFloat(i, 0, count - 1);
      const radius = rRange.getValue(i / (count - 1));

      const circle = circleFactory.create({
        x,
        y,
        radius
      });

      this.add(circle);
    }
  }
}