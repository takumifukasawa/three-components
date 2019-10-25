import Timer from "./Timer";

export default class TimeSkipper extends Timer {

  constructor(func: (t: number, dt: number) => void, fps: number) {
    super(func, fps);
  }

  exec(time: number) {
    // first frame
    if (this.time < 0) {
      this.time = time;
    }

    if (this.time < time) {
      while (this.time < time) {
        this.time += this.rate;
      }
      this.func(this.time, this.rate);
    }
  }
}
