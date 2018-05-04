export default class Renderer {

  size = {width: 0, height: 0};

  constructor({canvas, pixelRatio = 1}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.pixelRatio = pixelRatio;

    this.resize();
  }

  render(node) {
    this.ctx.save();

    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.ctx.clearRect(0, 0, this.size.width, this.size.height);

    node.render(this.ctx);

    this.ctx.restore();
  }

  resize() {
    this.size.width = this.canvas.clientWidth;
    this.size.height = this.canvas.clientHeight;

    this.canvas.width = this.size.width * this.pixelRatio;
    this.canvas.height = this.size.height * this.pixelRatio;
  }
}