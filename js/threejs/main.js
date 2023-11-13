import * as THREE from 'three';

// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { loadFBX } from './loadFBX';
import { loadGLTF } from './loadGLTF';
import { loadRGBE } from './loadRGBE';
// import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min'

// const gui = new GUI();

const cameraPosition = [100, 100, 100];

const scene = new THREE.Scene(); // 创建一个场景
scene.background = new THREE.Color(0x555555);
// 创建透视投影相机相机
const camera = new THREE.PerspectiveCamera(
  /*视野*/ 50,
  /**长宽比 */ window.innerWidth / window.innerHeight,
  /**近端渲染距离 */ 0.1,
  /**远端距离，最远看到多远 */ 1000,
);
camera.position.set(...cameraPosition);

// 创建WebGL渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, // 抗锯齿
});
renderer.setSize(window.innerWidth, window.innerHeight); // 通过调用 setSize() 方法设置渲染的长宽（设置渲染器为全屏）
document.body.appendChild(renderer.domElement); // 将渲染结果展示到页面上
renderer.outputEncoding = THREE.sRGBEncoding;

const geometry = new THREE.BoxGeometry(10, 10, 10); // 创建一个长宽高为10 的立方体
const sphereGeometry = new THREE.SphereGeometry(10); // 球
// const cylinderGeometry = new THREE.CylinderGeometry(10, 10, 20);

// loadFBX().then(meshs => {
//   scene.add(...meshs);
//   render();
// });


let promArr = [
//   loadFBX().then(meshs => {
//   scene.add(...meshs);
//   render();
// }),
  loadGLTF().then(gltf => {
    console.log(gltf);

    gltf.scene.children.forEach(it => {
      it.children.forEach(item => {
        item.material.depthWrite = true;
      })
    })
    // gltf.scene.scale.set(20, 20, 20);
    scene.add(gltf.scene);
  }),

  loadRGBE().then(dataTexture => {
    dataTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = dataTexture
  })
]


Promise.all(promArr).then(render)

// 材质 // 创建基础网格材质
// const materialBasic = new THREE.MeshBasicMaterial({
//   color: 0xffffff,
//   wireframe: true, //是否将几何体渲染为线框，默认值为false（即渲染为平面多边形）
//   // transparent: true, //开启透明
//   // opacity: 0.5, //设置透明度
// });
// const materialNormal = new THREE.MeshNormalMaterial({
//   transparent: true, //开启透明
//   opacity: 0.7,
// }); // 创建法线网格材质

const meshLambertMaterial = new THREE.MeshLambertMaterial({
  color: 0x777777,
});
const meshMatcapMaterial = new THREE.MeshMatcapMaterial();

// 创建一种网格，将材质包裹在几何体模型上
const cube = new THREE.Mesh(geometry, meshMatcapMaterial);
cube.position.set(30, 5, 30);

// const ball = new THREE.Mesh(cylinderGeometry, meshLambertMaterial);
// ball.position.set(20, 5, 0);

// const cylinder = new THREE.Mesh(sphereGeometry, meshLambertMaterial);
// cylinder.position.set(0, 10, 20);

// 创建多种网格，将材质包裹在几何体模型上
// const cube = SceneUtils.createMultiMaterialObject(geometry, [materialBasic, materialNormal]);

camera.lookAt(cube.position);

// scene.add(cube, ball, cylinder);

// 光源
// 创建光源 聚光灯光源
// const spotLight = new THREE.SpotLight(0xffffff);
// // 设置光源位置
// spotLight.position.set(100, 100, 0);
// // 设置光源照射的强度
// spotLight.intensity = 1;
// // 将光源添加到场景中
// scene.add(spotLight);

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(20, 20, 20);
// scene.add(pointLight);
// // 光源辅助观察
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
// scene.add(pointLightHelper);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);
// DirectionalLightHelper：可视化平行光
const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
scene.add(dirLightHelper);

//环境光:没有特定方向，整体改变场景的光照明暗
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

// 为了方便观察3D图像，添加三维坐标系对象
const axes = new THREE.AxesHelper(10); // 坐标系轴长设置为
//  把三维坐标系 添加到场景中
scene.add(axes);

const grid = new THREE.GridHelper(100, 100);
scene.add(grid);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

function render() {
  renderer.render(scene, camera); // 结合场景和相机进行渲染，即用摄像机拍下此刻的场景（最后一步）
}

render();

// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
  render();
}); //监听鼠标、键盘事件
