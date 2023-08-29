# 运行前复制静态资源
* cp node_modules/@imgly/background-removal/dist/*.wasm ./public/background-removal
* cp node_modules/@imgly/background-removal/dist/*.onnx ./public/background-removal

## 下载问题
    Error failed to bundle project: `https://github.com/tauri-apps/binary-releases/releases/download/nsis-3/nsis-3.zip: Network Error: timed out reading response`

直接下载这个zip文件，然后将解压后的文件放到C:\Users\用户\AppData\Local\tauri\WixTools目录下。

```rs
const NSIS_APPLICATIONID_URL: &str = "https://github.com/tauri-apps/binary-releases/releases/download/nsis-plugins-v0/NSIS-ApplicationID.zip";
const NSIS_TAURI_UTILS: &str =
  "https://github.com/tauri-apps/nsis-tauri-utils/releases/download/nsis_tauri_utils-v0.1.1/nsis_tauri_utils.dll";
```
简略的文件树
C:\Users\用户名\AppData\Local\tauri>
├─NSIS
│ ├─Bin
│ ├─Contrib
│ ├─Docs
│ ├─Examples
│ ├─Include
│ ├─Plugins
│ │ ├─x86-ansi
│ │ └─x86-unicode 下载的插件放这里  NSIS-ApplicationID/ReleaseUnicode/ApplicationID.dll 
│ └─Stubs
└─WixTools