import ranger, { Range } from "../../../../../dist/ranger.esm";
import BaseExample from "./BaseExample";
import rectFactory from "../factories/rectFactory";

export default class Divide extends BaseExample {

  description = '...';

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
    const xPositions = xRange.divide(32);
    const yPositions = yRange.divide(32);

    for(let i = 0; i < xPositions.length - 1; i++) {
      for (let j = 0; j < yPositions.length - 1; j++) {
        const x = xPositions[i];
        const y = yPositions[j];
        const width = xPositions[i + 1] - x;
        const height = yPositions[j + 1] - y;
        const rect = rectFactory.create({x, y, width, height});

        this.add(rect);
      }
    }
  }
}