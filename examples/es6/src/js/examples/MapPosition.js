import circleFactory from '../factories/circleFactory';
import ranger, { Range } from "../../../../../dist/ranger.esm";
import BaseExample from "./BaseExample";

export default class MapPosition extends BaseExample {

  description = 'X and Y positions are mapped to two ranges. Change the curves to see how it affects the distribution';

  state = {
    xCurve: undefined,
    yCurve: undefined,
  };

  createOptions() {
    this.createCurveSelector('xCurve', 'x curve');
    this.createCurveSelector('yCurve', 'y curve');
  }

  createGraphics() {
    // create a range between 0 and canvas width for x positions
    const xRange = new Range(0, this.size.width, this.state.xCurve);
    // create a range between 0 and canvas height for y positions
    const yRange = new Range(0, this.size.height, this.state.yCurve);
    const columns = 100;
    const rows = 100;

    // we can create a range for column indices
    const columnRange = new Range(0, columns - 1);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const circle = circleFactory.create({
          // mapFloats maps a value from this range to [min, max]
          x: xRange.mapFloats(i, 0, rows - 1),
          // map maps a value from this range to another range instance
          y: yRange.map(j, columnRange),
          radius: 1
        });

        this.add(circle);
      }
    }
  }
}