export default interface LifeCycle {
  awake(): void;
  start(): void;
  load(): void;
  fixedUpdate(time: number, deltaTime: number): void;
  update(time: number, deltaTime: number): void;
  destroy(time: number, deltaTime: number): void;
}
