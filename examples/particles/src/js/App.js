import { TweenMax } from 'gsap';
import guify from './lib/guify.min';
import ranger, { Range } from '../../../../dist/ranger.esm';
import BaseApp from './core/BaseApp';
import RandomPosition from "./examples/RandomPosition";
import MapPosition from "./examples/MapPosition";
import Divide from "./examples/Divide";

export default class App extends BaseApp {

  static exampleMap = {
    'Divide': Divide,
    'Map Position': MapPosition,
    'Random Position': RandomPosition
  };

  static exampleKeys = Object.keys(App.exampleMap);

  state = {
    exampleKey: App.exampleKeys[0]
  };

  constructor() {
    super({
      canvas: document.querySelector('#canvas')
    });

    this.elDiscription = document.querySelector('#description');

    this.initGUI();
    this.renderExample();
  }

  initGUI() {
    this.gui = new guify({
      title: 'Ranger.js',
      barMode: 'none'
    });

    this.gui.Register({
      type: 'title',
      label: 'Examples'
    });

    App.exampleKeys.forEach(key => {
      this.gui.Register({
        type: 'button',
        label: key,
        action: () => {
          this.state.exampleKey = key;
          this.renderExample();
        }
      })
    });

    this.gui.Register({
      type: 'title',
      label: 'Options'
    });

    // options inserted by the example itself
  }

  renderExample() {
    if (this.example) {
      this.example.destroy();
    }

    this.example = new App.exampleMap[this.state.exampleKey]({
      gui: this.gui,
      size: this.renderer.size
    });
    this.example.create();
    this.setRootNode(this.example);

    this.elDiscription.innerHTML = this.example.description;
  }
}
