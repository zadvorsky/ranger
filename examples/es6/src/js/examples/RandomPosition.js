import circleFactory from '../factories/circleFactory';
import ranger, { Range } from "../../../../../dist/ranger.esm";
import BaseExample from "./BaseExample";

export default class RandomPosition extends BaseExample {

  description = 'Circle positions and radii are randomized using ranges. Change the range to see how it affects the distribution.';

  state = {
    xCurve: undefined,
    yCurve: undefined,
    radiusCurve: undefined
  };

  createOptions() {
    this.createCurveSelector('xCurve', 'x curve');
    this.createCurveSelector('yCurve', 'y curve');
    this.createCurveSelector('radiusCurve', 'radius curve');
  }

  createGraphics() {
    // create a range between 0 and canvas width for x positions
    const xRange = new Range(0, this.size.width, this.state.xCurve);
    // create a range between 0 and canvas height for y positions
    const yRange = new Range(0, this.size.height, this.state.yCurve);
    // create a rang for radii
    // ranges with an xxOut curve will produce more larger circles
    // ranges with an xxIn curve will produce more smaller circles
    const radiusRange = new Range(1, 10, this.state.radiusCurve);

    for (let i = 0; i < 1000; i++) {
      const circle = circleFactory.create({
        x: xRange.random(),
        y: yRange.random(),
        radius: radiusRange.random(),
      });

      this.add(circle);
    }
  }
}