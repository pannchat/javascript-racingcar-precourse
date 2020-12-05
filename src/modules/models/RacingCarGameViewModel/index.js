import { Car } from '../../models';

function setInstances(target, property, names) {
  if (property === 'carInstances') {
    const instances = names.map(name => {
      return new Car(name);
    });
    target._carInstances = instances;

    return true;
  }
}

export default class RacingCarGameViewModel {
  constructor() {
    this.subscribers = [];
    this._carInstances = null;

    return new Proxy(this, {
      get(target, property) {
        return target[property];
      },

      set(target, property, names) {
        return setInstances(target, property, names);
      },
    });
  }

  publish() {
    const self = this;
    this.subscribers.every(subscriber => {
      subscriber.update(self);
      return true;
    });
  }

  registerViews(target) {
    this.subscribers.push(target);
  }

  gameContinue() {
    this._carInstances.forEach(car => {
      car.moveForward();
    });
  }
}
