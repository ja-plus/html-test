import './app.css';
import App from './App.svelte';
import '@brewer/beerui/assets/beer.css';
import 'normalize.css';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
