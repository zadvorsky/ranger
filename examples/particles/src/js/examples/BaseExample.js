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
          const parts = value.split('.');
          this.state[key] = window[parts[0]][parts[1]].getRatio;
        }

        this.update();
      }
    });

    this.options.push(gui);
  }

  update() {
    this.removeAll();
    this.createGraphics();
  }

  createGraphics() {}

  destroy() {
    this.options.forEach(option => {
      this.gui.Remove(option);
    });
  }
}