import foo, { bar } from './module.mjs?param=5;';
console.log('import.meta.url', import.meta.url);

setTimeout(() => {
  console.log(foo, bar);
}, 2000);
