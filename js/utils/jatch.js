/** ************
 * fetch 包装
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
 * @param {Object} conf fetch init obj
 * @returns
 */
function _originRequest(url, conf){
    const params = conf.params;
    const responseType = conf.responseType;
    // 拼url参数
    if (params) url += _createUrlParamStr(params);

    delete conf.params;
    delete conf.responseType;
    if (conf.body){
        try {
            conf.body = conf.body instanceof FormData
                        ? conf.body
                        : JSON.stringify(conf.body);
        } catch (e){
            throw new Error('cannot stringify body json');
        }
    }
    if (!conf.credentials) conf.credentials = 'same-origin'; // 自 2017 年 8 月 25 日以后，默认的 credentials 政策变更为 same-origin
    if (!(conf.body instanceof FormData)){
        conf.headers = Object.assign(conf.headers || {}, {
            'Content-Type': 'application/json'
        });
    }
    const fetchPromise = fetch(url, conf).then(res => {
        if (responseType === 'blob') return res.blob();
        if (responseType === 'text') return res.text();
        if (responseType === 'arraybuffer') return res.arrayBuffer();
        return res.json();
    });

    return fetchPromise;
}
/**
 *
 * @param {String} type get post put delete
 * @param {String} url
 * @param {Object} conf
 * @returns
 */
function _requestAdapter(type, url, conf = {}){
    conf.method = type;
    return _originRequest(url, conf);
}

function _get(url, conf){
    return _requestAdapter('GET', url, conf);
}

function _post(url, conf){
    return _requestAdapter('POST', url, conf);
}

function _put(url, conf){
    return _requestAdapter('PUT', url, conf);
}
function _del(url, conf){
    return _requestAdapter('DELETE', url, conf);
}

class Interceptors {
    response = {

    };
    add(filledFunc, rejectFunc){

    }
}
class Service{
    defaultConf = {};
    respInterceptors = [];
    constructor(defaultConf) {
        this.defaultConf = defaultConf;
    }
    /**
     * 设置请求拦截器
     * @param {Function} func
     */
    addRespInterceptor(func){
        if (typeof func !== 'function'){
            throw new Error('setRespIntercpet: param is not a function');
        }
        this.respInterceptor.push(func);
        return func;
    }
    /**
     * 删除请求拦截器
     * @param {Function} func
     */
    removeRespInterceptor(func){
        let i = this.respInterceptors.findIndex(f => f === func);
        this.respInterceptors.splice(i, 1);
    }
    #requestAdapter(type, url, conf){
        const assignedConf = Object.assign({}, conf, this.defaultConf);
        let fetchPromise = null;
        if (type === 'get'){
            fetchPromise = _get(url, assignedConf);
        }
        if ( type === 'post'){
            fetchPromise = _post(url, assignedConf);
        }
        // 添加响应拦截器
        if (this.respInterceptors.length){
            this.respInterceptors.forEach(func => {
                fetchPromise.then(data => {
                    return func(data, { type, ...conf });
                });
            });
        }
    }
    get(url, conf){
        this.#requestAdapter('get', url, conf);
    }
    post(url, conf){
        this.#requestAdapter('post', url, conf);
    }
}

function _create(){

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