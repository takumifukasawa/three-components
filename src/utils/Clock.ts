// import * as THREE from "three";

class Clock {
  static t: number = 0;
  static get time(): number {
    return performance.now() / 1000;
  }
}

export default Clock;
