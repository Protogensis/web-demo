import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { GUI } from "three/addons/libs/lil-gui.module.min.js";




function initThree() {
  const canvas = document.getElementById('three') as HTMLCanvasElement;
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true 
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  const environment = new RoomEnvironment(renderer);
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  scene.background = new THREE.Color(0xbbbbbb);
  scene.environment = pmremGenerator.fromScene(environment).texture;

  return { scene, renderer }
}

function initCamera(scene: THREE.Scene) {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    20
  );
  camera.position.set(-0.75, 0.7, 1.25);
  scene.add(camera)
  return camera
}

function initModel(scene: THREE.Scene) {
  // model

  new GLTFLoader()
    .setPath("/public/models/gltf/")
    .load("SheenChair.glb", function (gltf) {
      scene.add(gltf.scene);

      const object = gltf.scene.getObjectByName("SheenChair_fabric");
      if(!object)
        throw new Error()

      const gui = new GUI();
      object.material.sheen = 0
      gui.add(object.material, "sheen", 0, 1);
      gui.open();
    });

}

function initControl(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
  const control = new OrbitControls(camera, renderer.domElement);
  control.enableDamping = true;
  control.minDistance = 1;
  control.maxDistance = 10;
  control.target.set(0, 0.35, 0);
  control.update();
  return control
}

function run() {
  const { scene, renderer } = initThree()
  const camera = initCamera(scene)
  initModel(scene)
  const control = initControl(camera, renderer)
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  animate();
  function animate() {
    requestAnimationFrame(animate);

    control.update(); // required if damping enabled

    render();
  }

  function render() {
    renderer.render(scene, camera);
  }
}



run()


