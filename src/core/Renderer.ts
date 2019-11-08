import * as THREE from "three";

class Renderer {
  renderer: THREE.WebGLRenderer;

  constructor(options: { ratio: number, renderOptions: {} }) {
    const { ratio, renderOptions } = options;
    this.renderer = new THREE.WebGLRenderer(renderOptions);
    this.renderer.setPixelRatio(ratio);
  }
  setCamera() {
  }
  setSize(width: number, height: number): void {
    this.renderer.setSize(width, height);
  }
  fixedUpdate() {}
  update() {}
  render(scene: THREE.Scene, camera: THREE.Camera): void {
    this.renderer.render(scene, camera);
  }
}

export default Renderer;
