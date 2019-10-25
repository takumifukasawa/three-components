import * as THREE from "three";
import { Actor } from "@/src/actors/Actor";
import Component from "@/src/components/Component";
import { MeshComponent } from "./components";
import { waitTimeout } from "./utils/wait";

class TestCubeComponent extends Component {
  constructor() {
    super();
  }

  async load(actor: Actor) {
    const path = '/assets/textures/uv-checker.jpg';
    const loader = new THREE.TextureLoader();
    return new Promise(resolve => {
      loader.load(path, result => {
        const meshComponent = actor.getComponent(MeshComponent);
        if(!meshComponent) return;
        const { obj } = meshComponent;
        const material: THREE.Material | THREE.Material[] = obj.material;
        // TODO: any使いたくない
        (<any>material).map = result;
        resolve();
      });
    });
  }

  start() {
    setInterval(() => {
      this.isEnable = !this.isEnable;
    }, 1000);
  }

  update(actor: Actor, time: number, deltaTime: number) {
    actor.transform.rotation.y += deltaTime;
  }
}

export default TestCubeComponent;