// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  console.log('hahaha'); // 可以在浏览器控制台输出？
  return a + b;
}
