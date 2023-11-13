import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'

/** 加载环境贴图 */
export function loadRGBE(){
    const loader = new RGBELoader()
    return loader.loadAsync('./small_empty_room_1_4k.hdr')
    
}