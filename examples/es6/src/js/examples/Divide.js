import ranger, { Range } from "../../../../../dist/ranger.esm";
import BaseExample from "./BaseExample";
import rectFactory from "../factories/rectFactory";

export default class Divide extends BaseExample {

  description = '...';

  state = {
    xCurve: undefined,
    yCurve: undefined,
    xSteps: 16,
    ySteps: 16
  };

  createOptions() {
    this.createCurveSelector('xCurve', 'x curve');
    this.createCurveSelector('yCurve', 'y curve');
    this.createRangeInput('xSteps', 'x steps', 2, 32, 1);
    this.createRangeInput('ySteps', 'y steps', 2, 32, 1);
  }

  createGraphics() {
    const xRange = new Range(0, this.size.width, this.state.xCurve);
    const yRange = new Range(0, this.size.height, this.state.yCurve);

    const xRanges = xRange.divide(this.state.xSteps);
    const yRanges = yRange.divide(this.state.ySteps);

    for(let i = 0; i < xRanges.length; i++) {
      for (let j = 0; j < yRanges.length; j++) {
        const x = xRanges[i].min;
        const y = yRanges[j].min;
        const width = xRanges[i].length();
        const height = yRanges[j].length();

        const rect = rectFactory.create({x, y, width, height});

        this.add(rect);
      }
    }

    // const xPositions = xRange.slice(this.state.xSteps);
    // const yPositions = yRange.slice(this.state.ySteps);
    //
    // for(let i = 0; i < xPositions.length - 1; i++) {
    //   for (let j = 0; j < yPositions.length - 1; j++) {
    //     const x = xPositions[i];
    //     const y = yPositions[j];
    //     const width = xPositions[i + 1] - x;
    //     const height = yPositions[j + 1] - y;
    //     const rect = rectFactory.create({x, y, width, height});
    //
    //     this.add(rect);
    //   }
    // }
  }
}