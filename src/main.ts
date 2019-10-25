import * as THREE from "three";
import * as Core from "./index";
import Tag from "@/src/core/Tag";
import TestCubeComponent from "./TestCubeComponent";

//---------------------------------------------------------------------------------------------------------
// setups
//---------------------------------------------------------------------------------------------------------

const level = new Core.Level(new THREE.Scene());

const renderer = new Core.Renderer({
  renderOptions: {
    canvas: document.querySelector(".canvas") as HTMLCanvasElement,
  },
  ratio: 1.5,
});

const engine = new Core.Engine({
  dom: document.querySelector(".wrapper") as HTMLElement,
  renderer,
});
engine.setCurrentLevel(level);

engine.events.on(Core.EngineEventNames.BEFORE_FIXED_UPDATE, () => {
});
engine.events.on(Core.EngineEventNames.AFTER_FIXED_UPDATE, () => {
});
engine.events.on(Core.EngineEventNames.BEFORE_UPDATE, () => {
});
engine.events.on(Core.EngineEventNames.AFTER_UPDATE, () => {
});
engine.events.on(Core.EngineEventNames.BEFORE_RENDER, () => {
});
engine.events.on(Core.EngineEventNames.AFTER_RENDER, () => {
});

//---------------------------------------------------------------------------------------------------------
// init level
//---------------------------------------------------------------------------------------------------------

const init = () => {
  const gridActor = new Core.Actor([
    new Core.ObjectComponent(new THREE.GridHelper(10, 10))
  ]);
  level.addActor(gridActor);

  const cubeActor = new Core.Actor([
    new Core.MeshComponent(new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xffffff
      })
    )),
    new TestCubeComponent(),
  ]);
  level.addActor(cubeActor);

  const cameraActor = new Core.CameraActor(
    new Core.PerspectiveCameraComponent(new THREE.PerspectiveCamera(45, 1, 0.1, 10000)),
    [
      new Core.OrbitControlsComponent(renderer.renderer.domElement)
    ]
  );
  cameraActor.transform.position.set(3, 3, 5);
  cameraActor.transform.lookAt(new THREE.Vector3(0, 0, 0));
  cameraActor.tag = Tag.MainCamera;
  level.addActor(cameraActor);
};

//---------------------------------------------------------------------------------------------------------
// main
//---------------------------------------------------------------------------------------------------------

const main = async () => {
  init();
  engine.awake();
  // TODO: loadはengineに移譲した方が良い？
  await level.load();
  engine.setSize();
  engine.start();
}

main();