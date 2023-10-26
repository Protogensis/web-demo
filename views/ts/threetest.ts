import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function initThree() {
  const canvas = document.getElementById("three") as HTMLCanvasElement;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, //  打开抗锯齿
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbbbbbb);

  return { canvas, scene, renderer };
}
//摄像机
function initCamera() {
  const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
  );

  camera.position.set(1, 1, 1);
  return camera;
}

//灯光
function initLight() {
  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  return light;
}

//几何图元
function initGeometry() {
  const boxgeometry = new THREE.BoxGeometry();
  const planegeo = new THREE.PlaneGeometry(200, 100);
  const sgeo = new THREE.SphereGeometry()
  
  const boxmaterial = new THREE.MeshToonMaterial({
    color: 0x44aa88,
  });
  const planematerial = new THREE.MeshToonMaterial({
    color: 0xEEC900,
  });

  const cube = new THREE.Mesh(boxgeometry, boxmaterial);
  const plane = new THREE.Mesh(planegeo, planematerial);
  const sphere = new THREE.Mesh(sgeo,boxmaterial)

  cube.translateY(0.5)
  plane.rotateX(-Math.PI/2)
  sphere.translateX(-3)
  sphere.translateY(1)

  const meshs = { cube, plane,sphere }

  return meshs;
}

function initControl(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) {
  let control = new OrbitControls(camera, renderer.domElement);
  control.enableDamping = true;
  control.minDistance = 1.4;
  control.maxDistance = 4;
  control.target.set(0, 0.35, 0);
  control.update();
  return control;
}

function run() {
  const { canvas, scene, renderer } = initThree();
  const camera = initCamera();
  const light = initLight();
  const { cube, plane,sphere } = initGeometry();
  const control = initControl(camera, renderer);
  scene.add(camera);
  scene.add(light);
  scene.add(cube);
  scene.add(plane);
  scene.add(sphere)

  animate();

  function animate() {
    requestAnimationFrame(animate);

    control.update(); // required if damping enabled

    render();
  }

  function render() {
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

run();
