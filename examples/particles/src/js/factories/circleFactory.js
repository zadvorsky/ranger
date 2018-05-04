import Circle from "../core/graphics/Circle";
import Node from "../core/sceneGraph/Node";

const circleFactory = {
  create(x, y, radius, color) {
    const c = new Node(new Circle({
      radius: radius,
      fill: color
    }));

    c.x = x;
    c.y = y;

    return c;
  }
};

export default circleFactory;