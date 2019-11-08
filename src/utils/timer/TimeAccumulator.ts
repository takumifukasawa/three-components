
import Timer from "./Timer";

export default class TimeAccumulator extends Timer {
  chaseCount: number;

  constructor(
    func: (t: number, dt: number) => void,
    fps: number,
    chaseCount: number = 5
  ) {
    super(func, fps);
    this.chaseCount = chaseCount;
  }

  exec(time: number) {
    // first frame
    if (this.time < 0) {
      this.time = time;
    }

    if (this.time >= time) {
      return;
    }

    // TODO: chase count しても足りないときは一気にスキップする感じに本当はしたいんだよね

    let count: number = 0;
    while (count < this.chaseCount && this.time < time) {
      this.time += this.rate;
      this.func(this.time, this.rate);
      count += 1;
    }
  }
}
