import App from './svelte/App.svelte';

const app = new App({
  target: document.querySelector('#svelte-app'),
  props: {
    name: 'Hello Svelte'
  }
});
export default app;