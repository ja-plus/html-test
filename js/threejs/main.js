import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, MeshNormalMaterial, Mesh, SpotLight } from 'three';

const scene = new Scene(); // 创建一个场景
// 创建透视投影相机相机
const camera = new PerspectiveCamera(
  /*视野*/ 50,
  /**长宽比 */ window.innerWidth / window.innerHeight,
  /**近端渲染距离 */ 0.1,
  /**远端距离，最远看到多远 */ 1000,
);
camera.position.set(5, 10, 10);

// 创建WebGL渲染器
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // 通过调用 setSize() 方法设置渲染的长宽（设置渲染器为全屏）
document.body.appendChild(renderer.domElement); // 将渲染结果展示到页面上
renderer.render(scene, camera); // 结合场景和相机进行渲染，即用摄像机拍下此刻的场景（最后一步）

const geometry = new BoxGeometry(10, 10, 10); // 创建一个长宽高为1 的立方体

// 材质 // 创建基础网格材质
const materialBasic = new MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true, //是否将几何体渲染为线框，默认值为false（即渲染为平面多边形）
});
// const materialNormal = new MeshNormalMaterial(); // 创建法线网格材质

// 创建一种网格，将材质包裹在几何体模型上
const cube = new Mesh(geometry, materialBasic);

// 创建多种网格，将材质包裹在几何体模型上
// const cube = SceneUtils.createMultiMaterialObject(geometry, [
//     materialBasic,
//     materialNormal
// ]);

camera.lookAt(cube.position);

scene.add(cube);

// 光源
// 创建光源
const spotLight = new SpotLight(0xffffff);
// 设置光源位置
spotLight.position.set(0, 20, 20);
// 设置光源照射的强度
spotLight.intensity = 5;
// 将光源添加到场景中
scene.add(spotLight);

// 为了方便观察3D图像，添加三维坐标系对象
const axes = new AxisHelper(4); // 坐标系轴长设置为 4
//  把三维坐标系 添加到场景中
scene.add(axes);
