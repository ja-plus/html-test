import('remoteApp/index').then(res => {
  const app2 = res.default;
  app2();
});

import('remoteApp/console').then(res => {
  res.default();
});
export default {
  a: 'Hello world'
};