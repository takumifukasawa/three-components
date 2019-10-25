export default abstract class Timer {
  func: (t: number, dt: number) => void;
  fps: number = 0;
  rate: number;
  time: number;

  constructor(
    func: (t: number, dt: number) => void,
    fps: number,
  ) {
    this.func = func;
    this.rate = 1 / fps;
    this.time = -Infinity;
  }

  reset(time: number) {
    this.time = time;
  }

  getCurrentTime() {
    return this.time;
  }

  exec(time: number) {
    throw new Error("must implementation method.");
  }
}
