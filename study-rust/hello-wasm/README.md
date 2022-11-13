## 编译
* wasm-pack build --scope mynpmusername
* wasm-pack build --target bundler // 生成的是npm包结构，可以直接发布提供他人下载引用; 要用webpack等编译
* wasm-pack build --target web // 用这个
* wasm-pack build --target nodejs