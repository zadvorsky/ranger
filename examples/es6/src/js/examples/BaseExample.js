import Node from "../core/sceneGraph/Node";
import { curves } from "../config";
import ranger from "../../../../../dist/ranger.esm";

export default class BaseExample extends Node {
  constructor({size, gui}) {
    super();

    this.size = size;
    this.gui = gui;
    this.options = [];
  }

  create() {
    this.createOptions();
    this.createGraphics();
  }

  createOptions() {}

  createCurveSelector(key, label) {
    const gui = this.gui.Register({
      type: 'select',
      label,
      options: curves,
      onChange: value => {
        if (value === 'none') {
          this.state[key] = ranger.LINEAR;
        } else {
          // GSAP easing functions are stored as 'Name.function'
          const parts = value.split('.');
          this.state[key] = x => window[parts[0]][parts[1]].getRatio(x);
        }

        this.updateGraphics();
      }
    });

    this.options.push(gui);
  }

  createRangeInput(key, label, min, max, step) {
    const gui = this.gui.Register({
      type: 'range',
      label,
      min,
      max,
      step,
      object: this.state,
      property: key,
      onChange: value => {
        this.state[key] = value;
        this.updateGraphics();
      }
    });

    this.options.push(gui);
  }

  updateGraphics() {
    this.removeAll();
    this.createGraphics();
  }

  createGraphics() {}

  update() {

  }

  destroy() {
    this.options.forEach(option => {
      this.gui.Remove(option);
    });
  }
}