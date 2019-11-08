import * as THREE from "three";
import Component from "@/src/components/Component";

class CameraComponent extends Component {
  camera: THREE.Camera;
  constructor(camera: THREE.Camera) {
    super();
    this.camera = camera;
  }
  setSize(width: number, height: number) {
    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
    // TODO: orthographic camera
  }
}

export default CameraComponent;