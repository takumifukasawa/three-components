import * as THREE from "three";
import Component from "@/src/components/Component";

class ObjectComponent extends Component {
  obj: THREE.Object3D;
  constructor(obj: THREE.Object3D) {
    super();
    this.obj = obj;
  }
}

export default ObjectComponent;