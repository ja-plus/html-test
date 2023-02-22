// import { invoke } from '@tauri-apps/api'
const { invoke } = window.__TAURI__.tauri;
// `invoke` 返回异步函数
invoke('greet', { name: 'World' }).then(response => console.log(response));
