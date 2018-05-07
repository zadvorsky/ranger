import Node from "../core/sceneGraph/Node";
import Rect from "../core/graphics/Rect";

const rectFactory = {
  create({x = 0, y = 0, width = 0, height= 0, color = '#000'}) {
    const c = new Node(new Rect({
      width,
      height,
      stroke: color
    }));

    c.x = x;
    c.y = y;

    return c;
  }
};

export default rectFactory;