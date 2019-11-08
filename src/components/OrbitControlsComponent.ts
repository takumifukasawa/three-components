import * as THREE from "three";
import Component from "@/src/components/Component";
import { Actor } from "@/src/actors/Actor";
import CameraComponent from "./CameraComponent";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class OrbitControlsComponent extends Component {
  controls: OrbitControls | undefined;
  domElement: HTMLElement | undefined;

  constructor(domElement?: HTMLElement | undefined) {
    super();
    this.domElement = domElement;
  }

  start(actor: Actor) {
    const cameraComponent = actor.getComponent(CameraComponent);
    if(!cameraComponent) return;
    const camera = cameraComponent.camera;
    if(camera) {
      this.controls = new OrbitControls(camera, this.domElement);
    }
  }

  update() {
    if(this.controls) this.controls.update();
  }
}

export default OrbitControlsComponent;