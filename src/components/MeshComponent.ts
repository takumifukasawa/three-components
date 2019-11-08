import * as THREE from "three";
import Component from "@/src/components/Component";

class MeshComponent extends Component {
  obj: THREE.Mesh;
  constructor(obj: THREE.Mesh) {
    super();
    this.obj = obj;
  }
}

export default MeshComponent;
