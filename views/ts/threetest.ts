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

function initCamera(canvas: HTMLCanvasElement) {
  //摄像机
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.5,
    100
  );

  camera.position.z = 2;
  return camera;
}

function initGeometry() {
  //几何图元
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });

  const cube = new THREE.Mesh(geometry, material);
  return cube;
}



function run() {
  const { canvas, scene, renderer } = initThree();
  const camera = initCamera(canvas);
  const cube = initGeometry();
  scene.add(camera)
  scene.add(cube);

  function render( time ) {

    time *= 0.001; // convert time to seconds
  
    cube.rotation.x = time;
    cube.rotation.y = time;
  
    renderer.render( scene, camera );
  
    requestAnimationFrame( render );
  
  }
  requestAnimationFrame(render)

  renderer.render(scene, camera);
  window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    renderer.render(scene, camera);
  });
}

run();
