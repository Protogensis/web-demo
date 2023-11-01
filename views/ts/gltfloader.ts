import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

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
  // LIGHTS

  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 2 );
  hemiLight.color.setHSL( 0.6, 1, 0.6 );
  hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
  hemiLight.position.set( 0, 50, 0 );
  scene.add( hemiLight );

  const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 2 );
  scene.add( hemiLightHelper );

  //

  const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
  dirLight.color.setHSL( 0.1, 1, 0.95 );
  dirLight.position.set( - 1, 1.75, 1 );
  dirLight.position.multiplyScalar( 30 );
  scene.add( dirLight );

  dirLight.castShadow = true;

  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;

  const d = 50;

  dirLight.shadow.camera.left = - d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = - d;

  dirLight.shadow.camera.far = 3500;
  dirLight.shadow.bias = - 0.0001;

  const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 2 );
  scene.add( dirLightHelper );

  
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
        if (child.isMesh) {
          child.castShadow = true;
          set.add(child.material);
        }
      });

      for (const iterator of set) {
        const material = new THREE.MeshToonMaterial({
          color: iterator.color,
        });
        map.set(iterator, material);
      }
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          const material = map.get(child.material);
          child.material = material;
        }
      });
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          console.log(child);
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

function run() {
  const { scene, renderer } = initThree();
  const camera = initCamera(scene);
  initModel(scene);
  initLight(scene);
  const control = initControl(camera, renderer);
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

run();
