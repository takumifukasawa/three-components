import { Actor, Component } from "..";
import CameraComponent from "../components/CameraComponent";
import * as _ from 'lodash';

class CameraActor extends Actor {
  constructor(cameraComponent: CameraComponent, components: Component[] = []) {
    const allComponent = _.concat(components, cameraComponent);
    super(allComponent);
    // avoidance camera in object3D
    this.transform = cameraComponent.camera;
  }
}

export default CameraActor;