console.log('import.meta.url', import.meta.url);

let foo = 1;

// export default foo; // 不是符号绑定。内外更改都没用。 等价export default 1;
export let bar = 1; // 是符号绑定。内外更改都会同步变。
export { bar as default }; // 这样也是符号绑定
setTimeout(() => {
  foo = 2;
  bar = 2;
}, 1000);
