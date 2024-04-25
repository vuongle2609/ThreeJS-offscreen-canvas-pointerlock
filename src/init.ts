import * as THREE from "three";

class Three {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;

  constructor(
    canvas: THREE.OffscreenCanvas,
    width: number,
    height: number,
    pixelRatio: number
  ) {
    this.initialize(canvas, width, height, pixelRatio);
  }

  initialize(
    canvas: THREE.OffscreenCanvas,
    width: number,
    height: number,
    pixelRatio: number
  ) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    this.renderer.shadowMap.enabled = true;
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(width, height, false);

    this.camera = new THREE.PerspectiveCamera(40, width / height, 1.0, 500);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#DEF5E5");

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(4, 4, 4),
      new THREE.MeshBasicMaterial({ color: 0x0d4c92 })
    );
    const cube2 = cube.clone();
    const cube3 = cube.clone();
    const cube4 = cube.clone();

    cube.position.set(0, 0, -10);
    cube2.position.set(0, 0, 10);
    cube3.position.set(10, 0, 0);
    cube4.position.set(-10, 0, 0);

    this.scene.add(cube);
    this.scene.add(cube2);
    this.scene.add(cube3);
    this.scene.add(cube4);

    this.camera.position.set(0, 4, 0);

    this.camera.rotation.order = "YXZ";

    this.RAF(0);
  }

  updateCameraRotation(x: number, y: number) {
    const sensitivity = 0.002;
    const rotationLimit = Math.PI / 2.5;

    const movementX = x * sensitivity;
    const movementY = y * sensitivity;

    this.camera.rotation.x -= movementY;
    this.camera.rotation.y -= movementX;

    this.camera.rotation.x = Math.max(
      -rotationLimit,
      Math.min(rotationLimit, this.camera.rotation.x)
    );

    console.log(this.camera.rotation);
  }

  onWindowResize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  RAF(t: number) {
    requestAnimationFrame((t) => {
      this.RAF(t);
    });

    this.renderer.render(this.scene, this.camera);
  }
}
export default Three;
