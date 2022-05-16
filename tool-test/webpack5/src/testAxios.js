import axios from 'axios';
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    console.log('response1', response);

    // 对响应数据做点什么
    return response;
    // return Promise.reject('233');
  },
  function (error) {
    // 对响应错误做点什么
    console.log('response1 err', error);
    return Promise.reject('1');
  },
);
axios.interceptors.response.use(
  function (response) {
    console.log('response2', response);
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    console.log('response2 err', error);
    // 对响应错误做点什么
    // return Promise.reject(error);
    return Promise.reject(error);
  },
);

axios
  .get('http://localhost:8081/getTestData1', {
    params: { type: 'aa' },
    // mode: 'cors',
  })
  .then(data => {
    console.log('data :>> ', data);
  })
  .catch(err => {
    console.log('axios erro', err);
  });
