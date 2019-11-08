import * as THREE from "three";
import Component from "../components/Component";
import Tag from "./Tag";
import * as _ from "lodash";
import CameraComponent from "../components/CameraComponent";
import { Actor } from "..";
import { EventEmitter } from 'events';

class Level {
  public scene: THREE.Scene;
  public events: EventEmitter = new EventEmitter();

  private actors: Actor[] = [];
  private mainCamera: THREE.Camera | undefined;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  getActorByTag(tag: Tag): Actor | undefined {
    return _.find(this.actors, actor => actor.tag == tag);
  }

  // TODO: levelでやる必要ある？
  setMainCamera(): void {
    const actor = this.getActorByTag(Tag.MainCamera);
    if(!actor) return;
    const cameraComponent = actor.getComponent(CameraComponent);
    if(!cameraComponent) return;
    this.mainCamera = cameraComponent.camera;
  }

  getMainCamera(): THREE.Camera | undefined {
    return this.mainCamera;
  }

  addActor(actor: Actor) {
    this.actors.push(actor);
    this.scene.add(actor.transform);
  }

  async load() {
    return Promise.all(_.map(this.actors, async actor => {
      await actor.load();
      // const loader = async () => {
      //   await actor.load();
      // };
      // await loader();
    }));
  }

  awake() {
    _.forEach(this.actors, actor => {
      actor.awake();
    });
  }

  start() {
    _.forEach(this.actors, actor => actor.start());
  }

  setSize(width: number, height: number) {
    _.forEach(this.actors, actor => actor.setSize(width, height));
  }

  // accumulation
  fixedUpdate(time: number, deltaTime: number) {
    _.forEach(this.actors, actor => actor.fixedUpdate(time, deltaTime));
  }
  // skipper update
  update(time: number, deltaTime: number) {
    _.forEach(this.actors, actor => actor.update(time, deltaTime));
  }
}

export default Level;
