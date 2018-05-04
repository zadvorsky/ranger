import Renderer from "./sceneGraph/Renderer";

export default class BaseApp {

  _rafId = null;
  rootNode = null;

  constructor({canvas, autoUpdate = true, autoResize = true}) {
    this.renderer = new Renderer({
      canvas,
      pixelRatio: window.devicePixelRatio
    });

    // update handling
    if (autoUpdate) {
      this._rafId = window.requestAnimationFrame(this.tick);
    }

    // resize handling
    if (autoResize) {
      window.addEventListener('resize', this.resize);
    }
  }

  destroy = () => {
    window.cancelAnimationFrame(this._rafId);
    window.removeEventListener('resize', this.resize);
  };

  setRootNode(node) {
    this.rootNode = node;
  }

  tick = () => {
    this.update();
    this.render();

    this._rafId = window.requestAnimationFrame(this.tick);
  };

  // abstract
  update() {};

  render() {
    if (this.rootNode) {
      this.renderer.render(this.rootNode);
    }
  };

  resize = () => {
    this.renderer.resize();
  };
}