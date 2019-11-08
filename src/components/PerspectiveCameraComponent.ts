import * as THREE from "three";
import CameraComponent from "@/src/components/CameraComponent";

class PerspectiveCameraComponent extends CameraComponent {
  constructor(camera: THREE.PerspectiveCamera) {
    super(camera);
  }
  setSize(width: number, height: number) {
    const camera = this.camera as THREE.PerspectiveCamera;
    camera.aspect = width / height;
    super.setSize(width, height);
  }
}

export default PerspectiveCameraComponent;