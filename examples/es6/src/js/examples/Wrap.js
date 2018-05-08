import circleFactory from '../factories/circleFactory';
import ranger, { Range } from "../../../../../dist/ranger.esm";
import BaseExample from "./BaseExample";

export default class Wrap extends BaseExample {

  description = 'Circle positions are wrapped around the canvas using ranges.';

  state = {
    speedXCurve: undefined,
    speedYCurve: undefined,
  };

  createOptions() {
    this.createCurveSelector('speedXCurve', 'speed x curve');
    this.createCurveSelector('speedXCurve', 'speed y curve');
  }

  createGraphics() {
    // create a range between 0 and canvas width for x positions
    const xRange = new Range(0, this.size.width, this.state.xCurve);
    // create a range between 0 and canvas height for y positions
    const yRange = new Range(0, this.size.height, this.state.yCurve);

    // fromSizeAndCenter creates a range of {min: size * -0.5 + center, max: size * 0.5 + center}
    // center is 0 by default
    // the two lines below create identical ranges
    const speedXRange = new Range().fromSizeAndCenter(8, 0, this.state.speedXCurve);
    const speedYRange = new Range().fromSizeAndCenter(8).setCurve(this.state.speedYCurve);

    const circleRadius = 12;
    const circleCount = 16;

    // wrap the position as soon as the circle is fully outside of the canvas
    this.wrapXRange = new Range(-circleRadius, this.size.width + circleRadius);
    this.wrapYRange = new Range(-circleRadius, this.size.height + circleRadius);

    for (let i = 0; i < circleCount; i++) {
      const circle = circleFactory.create({
        x: xRange.random(),
        y: yRange.random(),
        radius: circleRadius,
        color: `hsl(${ranger.mapFloat(i, 0, circleCount - 1, 0, 255)}, 100%, 50%)`
      });

      circle.speedX = speedXRange.random();
      circle.speedY = speedYRange.random();

      this.add(circle);
    }
  }

  update() {
    this.children.forEach(child => {
      child.x = this.wrapXRange.wrap(child.x + child.speedX);
      child.y = this.wrapYRange.wrap(child.y + child.speedY);
    });
  }
}