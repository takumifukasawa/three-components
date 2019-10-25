import * as THREE from "three";
import * as _ from "lodash";
import Component from "@/src/components/Component";
import LifeCycle from "@/src/core/LifeCycle";
import MeshComponent from "@/src/components/MeshComponent";
import ObjectComponent from "@/src/components/ObjectComponent";
import CameraComponent from "@/src/components/CameraComponent";
import Tag from "@/src/core/Tag";
import { EventEmitter } from "events";
import strEnum from "../utils/strEnum";

// TODO: isenabled, isawakedの出しわけちゃんとする

export const ActorEventNames = strEnum([
  'AWAKE',
  'START',
  'FIXED_UPDATE',
  'UPDATE',
]);

// ref: html5gamedevs.com/topic/31386-component-based-architecture-in-typescript/?tab=comments#comment-180511

interface ComponentType<T extends Component> { new(...args: any[]): T }

export class Actor implements LifeCycle {
  public transform: THREE.Object3D = new THREE.Object3D();
  public tag: Tag = Tag.None;
  public events: EventEmitter = new EventEmitter();

  private components: Component[] = [];

  constructor(components: Component[]) {
    _.forEach(components, component => {
      this.addComponent(component);
    });
  }

  public addComponent(component: Component) {
    this.components.push(component);
    if (
      component instanceof MeshComponent ||
      component instanceof ObjectComponent
    ) {
      this.transform.add(component.obj);
    }
  }

  private getComponentIndex<T extends Component>(type: ComponentType<T>): number {
    for(let i = 0; i < this.components.length; ++i) {
      const component: Component = this.components[i];
      if(component instanceof type) {
        return i;
      }
    }
    return -1;
  }

  public getComponent<T extends Component>(type: ComponentType<T>, ...arggs: any[]): T | undefined {
  // getComponent<T>(constructor: { new (): T }): Component | undefined {
    const index: number = this.getComponentIndex(type);
    if(index !== -1) {
      return this.components[index] as T;
    }
    return undefined;
  }

  async load() {
    return Promise.all(_.map(this.components, async component => {
      const loader = async () => {
        await component.load(this);
      };
      await loader();
    }));
  }

  public awake() {
    this.events.emit(ActorEventNames.AWAKE);
    _.forEach(this.components, component => {
      if(component.isEnable) component.awake(this);
    });
  }

  public start() {
    this.events.emit(ActorEventNames.START);
    _.forEach(this.components, component => {
      if(component.isEnable) component.start(this);
    });
  }

  public setSize(width: number, height: number) {
    _.forEach(this.components, component => {
      if(component.isEnable) component.setSize(width, height);
    });
  }

  public fixedUpdate (time: number, deltaTime: number) {
    this.events.emit(ActorEventNames.FIXED_UPDATE);
    _.forEach(this.components, component => {
      if(component.isEnable) component.fixedUpdate(this, time, deltaTime);
    });
  };

  public update (time: number, deltaTime: number) {
    this.events.emit(ActorEventNames.UPDATE);
    _.forEach(this.components, component => {
      if(component.isEnable) component.update(this, time, deltaTime);
    });
  };

  public destroy() {}
}
