
import { EventEmitter } from "events";
import Level from "@/src/core/Level";
import Renderer from "@/src/core/Renderer";
import TimeAccumulator from "@/src/utils/timer/TimeAccumulator";
import Timer from "@/src/utils/timer/Timer";
import TimeSkipper from "@/src/utils/timer/TimeSkipper";
import { waitTimeout } from "@/src/utils/wait";
import Clock from "@/src/utils/Clock";
import strEnum from "../utils/strEnum";

export const EngineEventNames = strEnum([
  'BEFORE_FIXED_UPDATE',
  'AFTER_FIXED_UPDATE',
  'BEFORE_UPDATE',
  'AFTER_UPDATE',
  'BEFORE_RENDER',
  'AFTER_RENDER',
]);

export class Engine {
  renderer: Renderer;
  level: Level | undefined; // TODO: array
  dom: HTMLElement;
  fixedUpdateTimer: Timer;
  updateTimer: Timer;
  renderTimer: Timer;
  ticker: () => void;
  events: EventEmitter = new EventEmitter();

  constructor(options: {
    renderer: Renderer,
    dom: HTMLElement,
  }) {
    const {
      renderer,
      dom,
    } = options;
    this.renderer = renderer;
    this.dom = dom;

    this.fixedUpdateTimer = new TimeAccumulator((t: number, dt: number) => this.fixedUpdate(t, dt), 60);
    this.updateTimer = new TimeSkipper((t: number, dt: number) => this.update(t, dt), 60);
    this.renderTimer = new TimeSkipper((t: number, dt: number) => this.render(t, dt), 60);

    this.ticker = () => this.tick();
  }

  public setCurrentLevel(level: Level): void {
    this.level = level;
  }

  public switchLevel() {}

  setSize() {
    // TODO: auto resize flag
    const width: number = this.dom.offsetWidth;
    const height: number = this.dom.offsetHeight;
    if(this.level) {
      this.level.setSize(width, height);
    } else {
      throw new Error("must set level to engine.");
    }
    this.renderer.setSize(width, height);
  }

  awake() {
    if(!this.level) {
      throw new Error("must set level to engine.");
    }
    this.level.awake();
  }

  start() {
    if(!this.level) {
      throw new Error("must set level to engine.");
    }
    this.level.start();
    window.addEventListener("resize", () => this.setSize());
    requestAnimationFrame(this.ticker);
  }

  stop() {}

  tick() {
    const time = Clock.time;
    this.fixedUpdateTimer.exec(time);
    this.updateTimer.exec(time);
    this.renderTimer.exec(time);
    requestAnimationFrame(this.ticker);
  }

  // fixed timer
  fixedUpdate(time: number, deltaTime: number): void {
    this.events.emit(EngineEventNames.BEFORE_FIXED_UPDATE);
    if(this.level) {
      this.level.fixedUpdate(time, deltaTime);
    } else {
      throw new Error("must set level to engine.");
    }
    this.events.emit(EngineEventNames.AFTER_FIXED_UPDATE);
  }

  // accumulation timer
  update(time: number, deltaTime: number): void {
    this.events.emit(EngineEventNames.BEFORE_UPDATE);
    if(this.level) {
      this.level.update(time, deltaTime);
    } else {
      throw new Error("must set level to engine.");
    }
    this.events.emit(EngineEventNames.AFTER_UPDATE);
  }

  render(time: number, deltaTime: number): void {
    this.events.emit(EngineEventNames.BEFORE_RENDER);
    if(this.level) {
      const camera: THREE.Camera | undefined = this.level.getMainCamera();
      if(camera) this.renderer.render(this.level.scene, camera);
    } else {
      throw new Error("must set level to engine.");
    }
    this.events.emit(EngineEventNames.AFTER_RENDER);
  }
}