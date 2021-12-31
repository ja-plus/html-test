/** ************
 * fetch 包装
 * TODO: timeout，cancel request
 ***********/
/**
 * 拼接url参数
 * @param {Object} params url参数对象
 * @returns {String}
 */
function _createUrlParamStr(params){
    let str = '?';
    for (const key in params) {
        str += key + '=' + params[key] + '&';
    }
    return str === '?'
        ? ''
        : str.substring(0, str.length - 1);
}

/**
 * @param {String} url url
 * @param {Object} config fetch init obj
 * @returns {Promise}
 */
function _originRequest(url, config){
    const params = config.params;
    // 拼url参数
    if (params) url += _createUrlParamStr(params);

    if (config.body){
        // conf.body is object
        if (!(config.body instanceof FormData)
            && typeof config.body === 'object'){
            config.headers = Object.assign({
                'Content-Type': 'application/json'
            }, config.headers || {}, );
            try {
                config.body = JSON.stringify(config.body);
            } catch (e){
                throw new Error('cannot stringify body json');
            }
        }
    }
    if (!config.credentials) config.credentials = 'same-origin'; // 自 2017 年 8 月 25 日以后，默认的 credentials 政策变更为 same-origin

    return fetch(url, config);
}
/**
 *
 * @param {String} type get post put delete
 * @param {String} url
 * @param {Object} config
 * @returns
 */
function _requestAdapter(type, url, config = {}){
    config.method = type;
    const responseType = config.responseType;
    return _originRequest(url, config).then(response => {
        if (response.ok){
            if (responseType === 'blob') return response.blob();
            if (responseType === 'text') return response.text();
            if (responseType === 'arraybuffer') return response.arrayBuffer();
            if (responseType === 'response') return response; // response.body
            return response.json();
        } else {
            return Promise.reject({ msg: `res status:${response.status}`, res: response });
        }
    });
}
/**
 * @param {String} url
 * @param {Object} config
 * @returns
 */
function _get(url, config){
    return _requestAdapter('GET', url, config);
}
/**
 * @param {String} url
 * @param {Object} config
 * @returns
 */
function _post(url, config){
    return _requestAdapter('POST', url, config);
}
/**
 * @param {String} url
 * @param {Object} config
 * @returns
 */
function _put(url, config){
    return _requestAdapter('PUT', url, config);
}
/**
 * @param {String} url
 * @param {Object} config
 * @returns
 */
function _del(url, config){
    return _requestAdapter('DELETE', url, config);
}

class Interceptor {
    /** @type {Array<{id:string,onFulfilled:function,onRejected:function}>} */
    // store = [];
    /** @type {Function} */
    onFulfilled = null;
    /** @type {Function} */
    onRejected = null;
    use(onFulfilled, onRejected){
        if (onFulfilled && typeof onFulfilled !== 'function'){
            throw new TypeError('interceptor.add(onFulfilled, onRejected), parameter onFulfilled is not a function');
        }
        if (onRejected && typeof onRejected !== 'function'){
            throw new TypeError('interceptor.add(onFulfilled, onRejected), parameter onRejected is not a function');
        }
        this.onFulfilled = onFulfilled;
        this.onRejected = onRejected;
    }
    remove(){
        this.onFulfilled = null;
        this.onRejected = null;
    }
}
class Interceptors {
    request = new Interceptor;
    response = new Interceptor;
}
class Service{
    defaultConf = {};
    interceptors = new Interceptors;
    /**
     * @param {Object} defaultConf
     */
    constructor(defaultConf) {
        this.defaultConf = defaultConf;
    }
    /**
     *
     * @param {String} type
     * @param {String} url
     * @param {Object} config
     */
    #requestAdapter(url, config){
        const reqInterceptor = this.interceptors.request; // 请求拦截器
        const resInterceptor = this.interceptors.response; // 响应拦截器
        let assignedConf = Object.assign({}, config, this.defaultConf);

        // 请求拦截器
        if (reqInterceptor.onFulfilled){
            assignedConf = reqInterceptor.onFulfilled(url, assignedConf); // 请求拦截器中修改请求配置 TODO: deep clone
        }

        const fetchPromise = _originRequest(url, assignedConf)
            .then(response => {
                if (response.ok){
                    const responseType = assignedConf.responseType;
                    let prom;
                    if (responseType === 'blob') prom = response.blob();
                    else if (responseType === 'text') prom = response.text();
                    else if (responseType === 'arraybuffer') prom = response.arrayBuffer();
                    else if (responseType === 'response') prom = response; // response.body
                    else prom = response.json();
                    return prom.then(data => {
                        // 添加响应拦截器
                        return resInterceptor.onFulfilled
                            ? resInterceptor.onFulfilled(data, assignedConf, response) // 可能要把response对象传给拦截器使用
                            : data;
                    });
                } else {
                    // 响应错误
                    return Promise.reject({ msg: `res status:${response.status}`, response });
                }
            }).catch(err => {
                // 错误交给拦截器处理
                if (err.response?.ok){
                    // 响应错误
                    return resInterceptor.onRejected
                        ? resInterceptor.onRejected({ err, config: assignedConf })
                        : Promise.reject({ err, config: assignedConf });
                } else {
                    // 请求错误,(浏览器阻止请求)
                    return reqInterceptor.onRejected
                        ? reqInterceptor.onRejected({ err, config: assignedConf })
                        : Promise.reject({ err, config: assignedConf });
                }
            });
        return fetchPromise;
    }
    get(url, config = {}){
        config.method = 'GET';
        return this.#requestAdapter(url, config);
    }
    post(url, config = {}){
        config.method = 'POST';
        return this.#requestAdapter(url, config);
    }
    put(url, config = {}){
        config.method = 'PUT';
        return this.#requestAdapter(url, config);
    }
    del(url, config = {}){
        config.method = 'DELETE';
        return this.#requestAdapter(url, config);
    }

}
/**
 *
 * @param {Object} defaultConfig
 * @returns {Service}
 */
function _create(defaultConfig){
    return new Service(defaultConfig);
}
export { _get as get };
export { _post as post };
export { _put as put };
export { _del as del };
export { _create as create };
export default {
    create: _create,
    get: _get,
    post: _post,
    put: _put,
    del: _del
};