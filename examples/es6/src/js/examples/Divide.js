import ranger, { Range } from "../../../../../dist/ranger.esm";
import BaseExample from "./BaseExample";
import rectFactory from "../factories/rectFactory";

export default class Divide extends BaseExample {

  description = 'The canvas is divided into sub-ranges based on a curve for width and a curve for height.';

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
    // create a range between 0 and canvas width for x positions
    const xRange = new Range(0, this.size.width, this.state.xCurve);
    // create a range between 0 and canvas height for y positions
    const yRange = new Range(0, this.size.height, this.state.yCurve);
    // divide the ranges into sub-ranges (which are also Range instances)
    const xRanges = xRange.divide(this.state.xSteps);
    const yRanges = yRange.divide(this.state.ySteps);

    for(let i = 0; i < xRanges.length; i++) {
      for (let j = 0; j < yRanges.length; j++) {
        // min for x and y ranges gives us the position for each rect
        const x = xRanges[i].min;
        const y = yRanges[j].min;
        // length of each range gives us the size
        const width = xRanges[i].length(); // range.max - range.min
        const height = yRanges[j].length();

        const rect = rectFactory.create({x, y, width, height});

        this.add(rect);
      }
    }
  }
}