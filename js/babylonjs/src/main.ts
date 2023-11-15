import * as BABYLON from 'babylonjs';
import './style.css';

const canvas = document.createElement('canvas');
const { innerWidth, innerHeight } = window;
canvas.width = innerWidth;
canvas.height = innerHeight;
document.body?.append(canvas);

const engine = new BABYLON.Engine(canvas);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0));

  const faceUV = [];
  faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
  faceUV[1] = new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0); //front face
  faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
  faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
  const box = BABYLON.MeshBuilder.CreateBox('box', { faceUV });
  box.position.y = 0.5;

  const roof = BABYLON.MeshBuilder.CreateCylinder('roof', { diameter: 1.3, height: 1.2, tessellation: 3 });
  roof.scaling.x = 0.75;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;

  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10 });
  const groundMat = new BABYLON.StandardMaterial('standardMaterial', scene);
  groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
  ground.material = groundMat;

  const roofMat = new BABYLON.StandardMaterial('roofMat');
  roofMat.diffuseTexture = new BABYLON.Texture('https://assets.babylonjs.com/environments/roof.jpg', scene);
  roof.material = roofMat;
  const boxMat = new BABYLON.StandardMaterial('boxMat');
  boxMat.diffuseTexture = new BABYLON.Texture('https://doc.babylonjs.com/img/getstarted/cubehouse.png');
  // boxMat.diffuseTexture = new BABYLON.Texture('https://www.babylonjs-playground.com/textures/floor.png');
  box.material = boxMat;

  scene.addLight(light);
  scene.addCamera(camera);
  scene.addMesh(box);
  scene.addMesh(ground);
  scene.addMesh(roof);

  // scene.render();
  engine.runRenderLoop(function () {
    scene.render();
  });
  // Watch for browser/canvas resize events
  window.addEventListener('resize', function () {
    const { innerWidth, innerHeight } = window;

    canvas.width = innerWidth;
    canvas.height = innerHeight;
    engine.resize();
  });

  return scene;
};
createScene();
