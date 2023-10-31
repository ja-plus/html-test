import * as THREE from 'three';

// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const cameraPosition = [0, 200, 200];

const scene = new THREE.Scene(); // 创建一个场景
// 创建透视投影相机相机
const camera = new THREE.PerspectiveCamera(
  /*视野*/ 50,
  /**长宽比 */ window.innerWidth / window.innerHeight,
  /**近端渲染距离 */ 0.1,
  /**远端距离，最远看到多远 */ 500,
);
camera.position.set(...cameraPosition);

// 创建WebGL渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // 通过调用 setSize() 方法设置渲染的长宽（设置渲染器为全屏）
document.body.appendChild(renderer.domElement); // 将渲染结果展示到页面上

const geometry = new THREE.BoxGeometry(10, 10, 10); // 创建一个长宽高为10 的立方体
const sphereGeometry = new THREE.SphereGeometry(10, 10, 10); // 球
const cylinderGeometry = new THREE.CylinderGeometry(5, 10, 10);

// 材质 // 创建基础网格材质
const materialBasic = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true, //是否将几何体渲染为线框，默认值为false（即渲染为平面多边形）
  // transparent: true, //开启透明
  // opacity: 0.5, //设置透明度
});
// const materialNormal = new THREE.MeshNormalMaterial({
//   transparent: true, //开启透明
//   opacity: 0.7,
// }); // 创建法线网格材质

const meshLambertMaterial = new THREE.MeshLambertMaterial({});
const meshMatcapMaterial = new THREE.MeshMatcapMaterial();

// 创建一种网格，将材质包裹在几何体模型上
const cube = new THREE.Mesh(geometry, meshMatcapMaterial);

const ball = new THREE.Mesh(sphereGeometry, materialBasic);
ball.position.set(20, 0, 0);

const cylinder = new THREE.Mesh(cylinderGeometry, meshLambertMaterial);
cylinder.position.set(0, 0, 20);

// 创建多种网格，将材质包裹在几何体模型上
// const cube = SceneUtils.createMultiMaterialObject(geometry, [materialBasic, materialNormal]);

camera.lookAt(cube.position);

scene.add(cube, ball, cylinder);

// 光源
// 创建光源 聚光灯光源
const spotLight = new THREE.SpotLight(0xffffff);
// 设置光源位置
spotLight.position.set(0, 200, 0);
// 设置光源照射的强度
spotLight.intensity = 1;
// 将光源添加到场景中
scene.add(spotLight);

//环境光:没有特定方向，整体改变场景的光照明暗
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

const loader = new FBXLoader();
loader.load('./1111.fbx', function (loadedModel) {
  // console.log(loadedModel);
  loadedModel.children.forEach(child => {
    const mesh = child.clone();
    mesh.material = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
    });

    scene.add(mesh);
    render();
  });
});

// 为了方便观察3D图像，添加三维坐标系对象
const axes = new THREE.AxesHelper(10); // 坐标系轴长设置为
//  把三维坐标系 添加到场景中
scene.add(axes);

function render() {
  renderer.render(scene, camera); // 结合场景和相机进行渲染，即用摄像机拍下此刻的场景（最后一步）
}

render();

// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
  render();
}); //监听鼠标、键盘事件

// window.addEventListener('wheel', e => {
//   // console.log(e, 'a');
//   if (e.deltaY > 0) {
//     cameraPosition.forEach((v, i) => (cameraPosition[i] = v + 1));
//   } else {
//     cameraPosition.forEach((v, i) => {
//       let nv = v - 1;
//       cameraPosition[i] = nv < 0 ? 0 : nv;
//     });
//   }
//   camera.position.set(...cameraPosition);
//   renderer.render(scene, camera); // 结合场景和相机进行渲染，即用摄像机拍下此刻的场景（最后一步）
// });
