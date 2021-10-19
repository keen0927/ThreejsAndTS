import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// #1
const scene = new THREE.Scene();
// scene.background = new THREE.Color("#000000");

// #2
const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 10);
const camera2 = new THREE.OrthographicCamera(-2, 2, 2, -2);
camera1.position.z = 2;
camera2.position.z = 2;

// #3
const canvas1 = document.getElementById("testCanvas1") as HTMLCanvasElement;
const canvas2 = document.getElementById("testCanvas2") as HTMLCanvasElement;
const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 });
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 });
renderer1.setSize(200, 200);
renderer2.setSize(200, 200);

// 마우스 드래그로 막 움직임
new OrbitControls(camera1, renderer1.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera1.aspect = window.innerWidth / window.innerHeight;
  camera1.updateProjectionMatrix();
  render();
}

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  render();
}

function render() {
  renderer1.render(scene, camera1);
  renderer2.render(scene, camera2);
}

animate();
