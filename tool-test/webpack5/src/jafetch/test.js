import jafetch from 'ja-fetch';
/* test interceptor abortController*/
import { commonCancelRequest } from 'ja-fetch/preset/interceptors';
let ServiceAB = jafetch.create();
ServiceAB.interceptors.use(commonCancelRequest());

const fetchBtn = document.createElement('button');
fetchBtn.textContent = 'ja-fetch';
document.body.append(fetchBtn);
fetchBtn.addEventListener('click', () => {
  console.log('发起fetch 请求... 1s后返回结果');
  ServiceAB.get('http://localhost:8080/timeoutTestData', {
    params: { timeout: 1000 },
  })
    .then(response => {
      console.log('fetch response :>> ', response);
    })
    .catch(err => {
      console.warn('fetch请求已被取消', err);
    });
});
