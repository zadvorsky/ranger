import circleFactory from '../factories/circleFactory';
import ranger, { Range } from "../../../../../dist/ranger.esm";
import BaseExample from "./BaseExample";

export default class MapPosition extends BaseExample {

  description = 'Positions are mapped to x and y';

  state = {
    xCurve: undefined,
    yCurve: undefined,
  };

  createOptions() {
    this.createCurveSelector('xCurve', 'x curve');
    this.createCurveSelector('yCurve', 'y curve');
  }

  createGraphics() {
    const xRange = new Range(0, this.size.width, this.state.xCurve);
    const yRange = new Range(0, this.size.height, this.state.yCurve);
    const columns = 100;
    const rows = 100;

    const columnRange = new Range(0, columns - 1);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const circle = circleFactory.create({
          x: xRange.mapFloats(i, 0, rows - 1),
          y: yRange.map(j, columnRange),
          radius: 1
        });

        this.add(circle);
      }
    }
  }
}