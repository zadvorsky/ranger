import circleFactory from '../factories/circleFactory';
import ranger, { Range } from "../../../../../dist/ranger.esm";
import BaseExample from "./BaseExample";

export default class RandomPosition extends BaseExample {

  description = 'Circles are positioned randomly in ranges [0...width] and [0...height], using the selected curve.';

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
    const xRange = new Range(0, this.size.width, this.state.xCurve);
    const yRange = new Range(0, this.size.height, this.state.yCurve);
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