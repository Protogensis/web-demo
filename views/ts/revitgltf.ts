import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { GUI } from "three/addons/libs/lil-gui.module.min.js";

let camera, scene, renderer, controls;



function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  );
  camera.position.set(-0.75, 0.7, 1.25);

  scene = new THREE.Scene();

  // model

  new GLTFLoader()
    .setPath("/public/models/gltf/")
    .load("test.glb", function (gltf) {
      scene.add(gltf.scene);
      let items = gltf.scene.children[0].children
      console.log(items)

  
    });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  container.appendChild(renderer.domElement);

  // const environment = new RoomEnvironment(renderer);
  // const pmremGenerator = new THREE.PMREMGenerator(renderer);

  scene.background = new THREE.Color(0xbbbbbb);
  // scene.environment = pmremGenerator.fromScene(environment).texture;


  const amcolor = 0xffffff;
  const amintensity = 1;
  const amlight = new THREE.AmbientLight(amcolor, amintensity);
  scene.add(amlight);

  const color = 0xffffff;
  const intensity = 5;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(40, 100, 40);
  scene.add(light);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 10;
  controls.maxDistance = 20;
  controls.target.set(0, 0.35, 0);
  controls.update();

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

//

function animate() {
  requestAnimationFrame(animate);

  controls.update(); // required if damping enabled

  render();
}

function render() {
  renderer.render(scene, camera);
}

init();
animate();
