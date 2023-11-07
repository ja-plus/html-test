import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('three/js/libs/draco/gltf/');
export async function loadGLTF() {
  const loader = new GLTFLoader();
  //   loader.setDRACOLoader(dracoLoader);
  const gltf = await loader.loadAsync('./1111.gltf');
  //   const gltf = await loader.loadAsync('./CHR_ASK_002_cast.gltf');
  return gltf;
}
