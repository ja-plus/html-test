## 安装
* cargo install wasm-pack
会报错 openssl相关。去[官网](https://rustwasm.github.io/wasm-pack/installer/)下载即可。
## 编译
* wasm-pack build --scope mynpmusername
* wasm-pack build --target bundler // 生成的是npm包结构，可以直接发布提供他人下载引用; 要用webpack等编译
* wasm-pack build --target web // 用这个
* wasm-pack build --target nodejs