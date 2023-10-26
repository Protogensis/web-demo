import * as THREE from "three";

function initThree() {
  const canvas = document.getElementById("three") as HTMLCanvasElement;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, //  打开抗锯齿
  });

  const scene = new THREE.Scene();

  return { canvas, scene, renderer };
}
//摄像机
function initCamera(canvas: HTMLCanvasElement) {
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.5,
    100
  );

  camera.position.z = 2;
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
  const geometry = new THREE.DodecahedronGeometry(1,5);
  const material = new THREE.MeshToonMaterial({
    color: 0x44aa88,
  });

  const cube = new THREE.Mesh(geometry, material);
  return cube;
}

function run() {
  const { canvas, scene, renderer } = initThree();
  const camera = initCamera(canvas);
  const light = initLight();
  const cube = initGeometry();
  scene.add(camera);
  scene.add(light);
  scene.add(cube);

  function render(time: number) {
    time *= 0.001; // convert time to seconds

    cube.rotation.x = time;
    cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  renderer.render(scene, camera);
  window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    renderer.render(scene, camera);
  });
}

run();
