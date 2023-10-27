import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutlinePass } from "three/addons/postprocessing/OutlinePass.js";

function initThree() {
  const canvas = document.getElementById("three") as HTMLCanvasElement;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, //  打开抗锯齿
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0, 0, 0);

  return { canvas, scene, renderer };
}
//摄像机
function initCamera() {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.5,
    100
  );

  camera.position.set(1, 1, 1);
  return camera;
}

//几何图元
function initGeometry() {
  const boxgeometry = new THREE.BoxGeometry(1, 1, 1);
  const planegeo = new THREE.PlaneGeometry(200, 100);
  const sgeo = new THREE.SphereGeometry(0.5);

  const greenmaterial = new THREE.MeshToonMaterial({
    color: 0x44aa88,
  });
  const redmaterial = new THREE.MeshToonMaterial({
    color: new THREE.Color(1, 0.1, 0),
  });
  const graymaterial = new THREE.MeshToonMaterial({
    color: new THREE.Color(0.5, 0.5, 0.5),
  });

  const cube = new THREE.Mesh(boxgeometry, greenmaterial);
  const plane = new THREE.Mesh(planegeo, graymaterial);
  const sphere = new THREE.Mesh(sgeo, redmaterial);

  cube.castShadow = true;
  sphere.castShadow = true;
  plane.receiveShadow = true;

  cube.translateX(1);
  cube.translateY(0.51);
  plane.rotateX(-Math.PI / 2);
  sphere.translateX(-1);
  sphere.translateY(0.5);

  const meshs = { cube, plane, sphere };

  return meshs;
}

//灯光
function initLight(scene: THREE.Scene) {
  const amcolor = 0xffffff;
  const amintensity = 0.5;
  const amlight = new THREE.AmbientLight(amcolor, amintensity);
  scene.add(amlight);

  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(40, 100, 40);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  scene.add(light);
}

function initControl(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  let control = new OrbitControls(camera, renderer.domElement);
  control.enableDamping = true;
  control.minDistance = 10;
  control.maxDistance = 15;
  control.target.set(0, 0, 0);
  control.update();
  return control;
}

function run() {
  const { canvas, scene, renderer } = initThree();
  const camera = initCamera();



  initLight(scene);
  const { cube, plane, sphere } = initGeometry();
  const control = initControl(camera, renderer);
  scene.add(camera);

  scene.add(cube);
  scene.add(plane);
  scene.add(sphere);

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  // OutlinePass第一个参数v2的尺寸和canvas画布保持一致
  const v2 = new THREE.Vector2(window.innerWidth, window.innerHeight);
  // const v2 = new THREE.Vector2(800, 600);
  const outlinePass = new OutlinePass(v2, scene, camera);
  outlinePass.visibleEdgeColor.set(0.01,0.01,0.01);
  outlinePass.edgeThickness = 5.0;
  outlinePass.edgeStrength = 50; 

  outlinePass.selectedObjects = [cube,sphere]
  composer.addPass(outlinePass);

  animate();

  function animate() {
    composer.render();

    requestAnimationFrame(animate);

    control.update(); // required if damping enabled

    render();
  }

  function render() {
    composer.render()
  }

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

run();
