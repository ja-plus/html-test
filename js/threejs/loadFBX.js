import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';

export async function loadFBX() {
  const loader = new FBXLoader();
  const tgaLoader = new TGALoader();
  const loadedModel = await loader.loadAsync('/1111.fbx');
  const tasks = [];
  loadedModel.children.forEach(child => {
    const mesh = child.clone();
    tasks.push(
      new Promise(resolve => {
        tgaLoader.load(`/Map/${mesh.name}.tga`, texture => {
          // texture.flipY = false
          texture.colorSpace = THREE.SRGBColorSpace;
          mesh.material = new THREE.MeshToonMaterial({
            map: texture,
          });
          resolve(mesh);
        });
      }),
    );
  });
  return await Promise.all(tasks);
}
