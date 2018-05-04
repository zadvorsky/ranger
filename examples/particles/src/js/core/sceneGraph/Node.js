export default class Node {

  x = 0;
  y = 0;

  constructor(graphics) {
    this.children = [];
    this.graphics = graphics;
  }

  destroy() {
    if (this.graphics) {
      this.graphics.destroy();
    }

    this.children.forEach(child => {
      child.destroy();
    });

    this.children.length = 0;
  }

  add(child) {
    this.children.push(child);
  }

  remove(child) {
    const i = this.children.indexOf(child);

    if (i !== -1) {
      this.children.splice(i, 1);
    }
  }

  removeAll() {
    this.children.length = 0;
  }

  render(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);

    if (this.graphics) {
      this.graphics.render(ctx);
    }

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].render(ctx);
    }

    ctx.restore();
  }
}