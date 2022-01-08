import App from './svelte/App.svelte';

const app = new App({
  target: document.querySelector('#svelte-app'),
  props: {
    name: 'hello'
  }
});
export default app;