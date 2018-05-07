export default class Circle {
  constructor({cx = 0, cy = 0, radius = 0, fill = null, stroke = null}) {
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.fill = fill;
    this.stroke = stroke;

    this.updatePath();
  }

  destroy() {
    this.path = null;
  }

  updatePath() {
    this.path = new Path2D();
    this.path.arc(this.cx, this.cy, this.radius, 0, Math.PI * 2);
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