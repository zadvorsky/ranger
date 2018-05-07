import circleFactory from '../factories/circleFactory';
import ranger, { Range } from "../../../../../dist/ranger.esm";
import BaseExample from "./BaseExample";

export default class Color extends BaseExample {

  description = 'Color HSL values';

  state = {
    hCurve: undefined,
    sCurve: undefined,
    lCurve: undefined,
  };

  createOptions() {
    this.createCurveSelector('hCurve', 'h curve');
    this.createCurveSelector('sCurve', 's curve');
    this.createCurveSelector('lCurve', 'l curve');
  }

  createGraphics() {
    const steps = 32;
    const circleRadius = this.size.width / steps * 0.5;
    const xRange = new Range(0, this.size.width);
    const yRange = new Range(0, this.size.height);
    const xPositions = xRange.divide(steps);
    const yPositions = yRange.divide(steps);

    for(let i = 0; i < steps; i++) {
      for (let j = 0; j < steps; j++) {

        const h = ranger.randomInt(0, 256, this.state.hCurve);
        const s = ranger.mapFloat(i, 0, steps, 0, 255, this.state.sCurve);
        const l = ranger.mapFloat(j, 0, steps, 0, 100, this.state.lCurve);

        const circle = circleFactory.create({
          x: xPositions[i],
          y: yPositions[j],
          radius: circleRadius,
          color: `hsl(${h}, ${s}%, ${l}%)`
        });

        this.add(circle);
      }
    }
  }
}