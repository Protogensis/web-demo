import * as THREE from "three";
import * as OBC from "openbim-components";

// Get the <div> element where the scene will be displayed

const container = document.getElementById("container");
if (!container) throw new Error();

// Initialize the basic components needed to use this library

const components = new OBC.Components();

components.scene = new OBC.SimpleScene(components);
components.renderer = new OBC.SimpleRenderer(components, container);
components.camera = new OBC.SimpleCamera(components);
components.raycaster = new OBC.SimpleRaycaster(components);

components.init();

// Add some elements to the scene

const scene = components.scene.get();

const geometry = new THREE.BoxGeometry(3, 3, 3);
const material = new THREE.MeshStandardMaterial({ color: "yellow" });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 0);
scene.add(cube);

components.meshes.push(cube);

const directionalLight = new THREE.DirectionalLight();
directionalLight.position.set(5, 10, 3);
directionalLight.intensity = 0.5;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight();
ambientLight.intensity = 0.6;
scene.add(ambientLight);
