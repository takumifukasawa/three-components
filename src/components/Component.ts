import { Actor } from "..";

abstract class Component {
  isEnable: boolean = true
  isAwaked: boolean = false
  awake(actor: Actor) {}
  start(actor: Actor) {}
  load(actor: Actor): Promise<void> {
    return Promise.resolve();
  }
  setSize(width: number, height: number) {}
  fixedUpdate(actor: Actor, time: number, deltaTime: number) {}
  update(actor: Actor, time: number, deltaTime: number) {}
  destroy() {}
}

export default Component;
