import circleFactory from '../factories/circleFactory';
import ranger, { Range } from "../../../../../dist/ranger.esm";
import BaseExample from "./BaseExample";

export default class Color extends BaseExample {

  description = 'HSL color model controlled by 3 ranges.';

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
    // create a range between 0 and canvas width for x positions
    const xRange = new Range(0, this.size.width);
    // create a range between 0 and canvas height for y positions
    const yRange = new Range(0, this.size.height);
    // create an array of positions spread over the ranges
    // this array is inclusive, so the xPositions[0] === 0, and xPositions[steps - 1] === this.size.width
    const xPositions = xRange.slice(steps);
    const yPositions = yRange.slice(steps);

    for(let i = 0; i < steps; i++) {
      for (let j = 0; j < steps; j++) {
        // hsl color model:
        // hue: 0 - 255
        // saturation: 0 - 100 (%)
        // lightness: 0 - 100 (%)

        // create a color based on grid position and component ranges
        const h = ranger.randomInt(0, 256, this.state.hCurve);
        const s = ranger.mapFloat(i, 0, steps, 0, 100, this.state.sCurve);
        const l = ranger.mapFloat(j, 0, steps, 0, 100, this.state.lCurve);
        const color = `hsl(${h}, ${s}%, ${l}%)`;

        const circle = circleFactory.create({
          x: xPositions[i],
          y: yPositions[j],
          radius: circleRadius,
          color
        });

        this.add(circle);
      }
    }
  }
}