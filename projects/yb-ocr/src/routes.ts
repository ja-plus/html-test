import Ocr from './views/Ocr/index.svelte';
import BackgroundRemoval from './views/BackgroundRemoval/index.svelte';
export const routeInfo = [
  {
    name: 'Ocr',
    path: '/',
    component: Ocr,
  },
  {
    name: 'BgR',
    path: '/background-removal',
    component: BackgroundRemoval,
  },
];

const routes = {
  /** '/': Ocr */
};
routeInfo.forEach(item => {
  routes[item.path] = item.component;
});
export { routes };
