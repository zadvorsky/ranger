import circleFactory from '../factories/circleFactory';
import ranger, { Range } from "../../../../../dist/ranger.esm";
import BaseExample from "./BaseExample";

export default class ParticleTiming extends BaseExample {

  description = 'Particle animation duration and start time (delay) are both set using a curve. Change the curve to see how the animation is affected.';

  state = {
    delayCurve: undefined,
    durationCurve: undefined,
  };

  createOptions() {
    this.createCurveSelector('delayCurve', 'delay curve');
    this.createCurveSelector('durationCurve', 'duration curve');
  }

  createGraphics() {
    if (this.animation) {
      this.animation.kill();
    }

    this.animation = new TimelineMax({repeat: -1});

    const radius = 4;
    const count = 640;
    const centerX = this.size.width * 0.5;
    const centerY = this.size.height * 0.5;
    const angleRange = new Range(0, Math.PI * 2);
    // just outside of the screen
    const distance = this.size.width * 0.707 + radius;

    for (let i = 0; i < count; i++) {
      const circle = circleFactory.create({
        x: centerX,
        y: centerY,
        radius: 4,
      });

      // get an angle and distance based on i, spread equally around PI * 2.
      const angle = angleRange.getValue(i / (count - 1));
      const tx = centerX + Math.cos(angle) * distance;
      const ty = centerY + Math.sin(angle) * distance;

      // get a delay and duration based on the selected curve. Min and max values are arbitrary.
      const duration = ranger.random(0.5, 2.0, this.state.durationCurve);
      // const delay = ranger.random(0.0, 1.0, this.state.delayCurve);
      // const duration = ranger.mapFloat(i, 0, count - 1, 0.5, 2.0, this.state.durationCurve);
      const delay = ranger.mapFloat(i, 0, count - 1, 0.0, 1.0, this.state.delayCurve);

      this.animation.to(circle, duration, {
        x: tx,
        y: ty,
      }, delay);

      this.add(circle);
    }
  }

  destroy() {
    super.destroy();

    if (this.animation) {
      this.animation.kill();
    }
  }
}