import('remoteApp/index').then(res => {
  const remoteApp_index = res.default;
  remoteApp_index();
});

import('remoteApp/console').then(res => {
  res.default();
});
export default {
  a: 'Hello world'
};