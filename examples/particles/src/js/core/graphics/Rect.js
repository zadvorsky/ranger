export default class Rect {
  constructor({x = 0, y = 0, width = 0, height = 0, fill = null, stroke = null}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fill = fill;
    this.stroke = stroke;

    this.updatePath();
  }

  destroy() {
    this.path = null;
  }

  updatePath() {
    this.path = new Path2D();
    this.path.rect(this.x, this.y, this.width, this.height);
  }

  render(ctx) {
    if (this.fill !== null) {
      ctx.fillStyle = this.fill;
      ctx.fill(this.path);
    }

    if (this.stroke !== null) {
      ctx.strokeStyle = this.stroke;
      ctx.stroke(this.path);
    }
  }
}