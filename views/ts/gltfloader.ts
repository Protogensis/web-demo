import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineBasicMaterial, LineSegments } from "three";


const params = {
  exposure: 0,
  bloomStrength: 1.5,
  bloomThreshold: 0,
  bloomRadius: 0,
};

function initThree() {
  const canvas = document.getElementById("three") as HTMLCanvasElement;
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene.background = new THREE.Color(0xbbbbbb);

  return { scene, renderer };
}

function initCamera(scene: THREE.Scene) {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(-0.75, 0.7, 1.25);
  scene.add(camera);
  return camera;
}

// 光源
function initLight(scene: THREE.Scene) {

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
  hemiLight.color.setHSL(0.6, 1, 0.6);
  hemiLight.position.set(0, 50, 0);
  hemiLight.layers.set(0)
  scene.add(hemiLight);

  const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 2);
  scene.add(hemiLightHelper);

  //

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.color.setHSL(0.1, 1, 0.95);
  dirLight.position.set(-1, 1.75, 1);
  dirLight.position.multiplyScalar(30);
  scene.add(dirLight);

  dirLight.castShadow = true;
  scene.add(dirLight)



}

// model
function initModel(scene: THREE.Scene) {
  new GLTFLoader()
    .setPath("/public/models/gltf/")
    .load("cdtf.glb", function (gltf) {
      scene.add(gltf.scene);
      const set = new Set<THREE.MeshStandardMaterial>();
      const map = new Map<
        THREE.MeshStandardMaterial,
        THREE.MeshPhongMaterial
      >();
      gltf.scene.traverse((child) => {
        child.layers.set(0)
        if (child.isMesh) {
          child.castShadow = true;
          set.add(child.material);
        }
      });


      for (const iterator of set) {

        if (iterator.name.indexOf('光源') !== -1 || iterator.name.indexOf('发光') !== -1) {
          const material = new THREE.MeshPhysicalMaterial({
            emissive: new THREE.Color(1, 1, 0.1),
            color: iterator.color,
            name: iterator.name,
          });
          map.set(iterator, material);

        } else {
          const material = new THREE.MeshToonMaterial({
            color: iterator.color,
            name: iterator.name,
            map: iterator.map
          });
          map.set(iterator, material);
        }

      }

      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          const material = map.get(child.material);

          child.material = material;


        }
      });
      const data = new Array()
      const edgeMaterial = new LineBasicMaterial({ color: 0x000000, linewidth: 1 });
      gltf.scene.traverse((child) => {
        if (child.type === "Mesh") {
          
          const mesh = child as THREE.Mesh
          var edges = new THREE.EdgesGeometry(mesh.geometry,45);
          
          var line = new LineSegments(edges, edgeMaterial);
          mesh.add(line);
        }
      });
    });
}

function initControl(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
  const control = new OrbitControls(camera, renderer.domElement);
  control.enableDamping = true;
  control.minDistance = 1;
  control.maxDistance = 50;
  control.target.set(0, 0.35, 0);
  control.update();
  return control;
}

function initComposer(renderer: any, scene: any, camera: any) {
  const composer = new EffectComposer(renderer);

  const renderScene = new RenderPass(scene, camera);
  // 光晕
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;
  composer.addPass(renderScene);
  // composer.addPass(bloomPass);
  return composer
}

function run() {
  const { scene, renderer } = initThree();
  const camera = initCamera(scene);
  initModel(scene);
  initLight(scene);
  const control = initControl(camera, renderer);

  const composer = initComposer(renderer, scene, camera)

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
    composer.render();
  }
}

run();
