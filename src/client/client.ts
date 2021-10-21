import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";

// #1
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));
// scene.background = new THREE.Color("#000000");

// #2
const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 10);
// const camera2 = new THREE.OrthographicCamera(-2, 2, 2, -2);
camera1.position.z = 2;
// camera2.position.z = 2;

// #3
const canvas1 = document.getElementById("testCanvas1") as HTMLCanvasElement;
// const canvas2 = document.getElementById("testCanvas2") as HTMLCanvasElement;
const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 });
// const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 });
renderer1.setSize(200, 200);
// renderer2.setSize(200, 200);

// 마우스 드래그로 막 움직임
// 컨트롤스 상수에 집어넣고 change이벤트 리스너로 렌더링 시키면 OrbitControls이 가능하다
const controls = new OrbitControls(camera1, renderer1.domElement);
controls.addEventListener("change", render);

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

  stats.begin();
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  stats.end();

  render();

  // stats 업데이트
  // stats.update();
}

// stats 추가
const stats = Stats();
document.body.appendChild(stats.dom);

// GUI 추가
const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube, "visible");
cubeFolder.open();

const cubeRotationFolder = cubeFolder.addFolder("Rotation");
cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2);
cubeRotationFolder.open();

const cubePositionFolder = cubeFolder.addFolder("Position");
cubePositionFolder.add(cube.position, "x", -10, 10, 0.1);
cubePositionFolder.add(cube.position, "y", -10, 10, 0.1);
cubePositionFolder.add(cube.position, "z", -10, 10, 0.1);
cubePositionFolder.open();

const cubeScaleFolder = cubeFolder.addFolder("Scale");
cubeScaleFolder.add(cube.scale, "x", -5, 5);
cubeScaleFolder.add(cube.scale, "y", -5, 5);
cubeScaleFolder.add(cube.scale, "z", -5, 5);
cubeScaleFolder.open();

function render() {
  renderer1.render(scene, camera1);
  // renderer2.render(scene, camera2);
}

animate();
render();
