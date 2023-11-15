import * as BABYLON from 'babylonjs';
import './style.css';
const app = document.querySelector<HTMLDivElement>('#app');
const canvas = document.createElement('canvas');
const { innerWidth, innerHeight } = window;
canvas.width = innerWidth;
canvas.height = innerHeight;

app?.append(canvas);
const engine = new BABYLON.Engine(canvas);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0));

  const box = BABYLON.MeshBuilder.CreateBox('box', {});

  scene.addLight(light);
  scene.addCamera(camera);
  scene.addMesh(box);
  scene.render();
  return scene;
};
createScene();
