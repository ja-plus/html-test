/** ************
 * fetch 包装
 * TODO: timeout， request interceptor，  cancel request
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
 * @returns {Promise}
 */
function _originRequest(url, conf){
    const params = conf.params;
    // 拼url参数
    if (params) url += _createUrlParamStr(params);

    // delete conf.params;
    // delete conf.responseType;
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
    const fetchPromise = fetch(url, conf);/* .then(res => {
        if (res.ok){
            if (responseType === 'blob') return res.blob();
            if (responseType === 'text') return res.text();
            if (responseType === 'arraybuffer') return res.arrayBuffer();
            return res.json();
        } else {
            return Promise.reject({ msg: `res status:${res.status}`, res });
        }
    }); */

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
    const responseType = conf.responseType;
    return _originRequest(url, conf).then(res => {
        if (res.ok){
            if (responseType === 'blob') return res.blob();
            if (responseType === 'text') return res.text();
            if (responseType === 'arraybuffer') return res.arrayBuffer();
            return res.json();
        } else {
            return Promise.reject({ msg: `res status:${res.status}`, res });
        }
    });
}
/**
 * @param {String} url
 * @param {Object} conf
 * @returns
 */
function _get(url, conf){
    return _requestAdapter('GET', url, conf);
}
/**
 * @param {String} url
 * @param {Object} conf
 * @returns
 */
function _post(url, conf){
    return _requestAdapter('POST', url, conf);
}
/**
 * @param {String} url
 * @param {Object} conf
 * @returns
 */
function _put(url, conf){
    return _requestAdapter('PUT', url, conf);
}
/**
 * @param {String} url
 * @param {Object} conf
 * @returns
 */
function _del(url, conf){
    return _requestAdapter('DELETE', url, conf);
}

class Interceptor {
    /** @type {Array<{id:string,onFulfilled:function,onRejected:function}>} */
    // store = [];
    /** @type {Function} */
    onFulfilled = null;
    /** @type {Function} */
    onRejected = null;
    // add(onFulfilled, onRejected){
    //     if (onFulfilled && typeof onFulfilled !== 'function'){
    //         throw new TypeError('interceptor.add(onFulfilled, onRejected), parameter onFulfilled is not a function');
    //     }
    //     if (onRejected && typeof onRejected !== 'function'){
    //         throw new TypeError('interceptor.add(onFulfilled, onRejected), parameter onRejected is not a function');
    //     }
    //     let uuid = Date.now();
    //     this.store.push({
    //         id: uuid,
    //         onFulfilled,
    //         onRejected
    //     });
    //     return uuid;
    // }
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
        // if (id){
        //     let index = this.store.findIndex(it => it.id === Number(id));
        //     this.store.splice(index, 1);
        // } else {
            // remove all interceptors
            // this.store = [];
            this.onFulfilled = null;
            this.onRejected = null;
        // }
    }
}
class Response {
    interceptor = new Interceptor;
}
class Request {
    interceptor = new Interceptor;
}
class Service{
    defaultConf = {};
    response = new Response;
    request = new Request;
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
     * @param {Object} conf
     */
    #requestAdapter(url, conf){
        const assignedConf = Object.assign({}, conf, this.defaultConf);
        const responseType = assignedConf.responseType;

        const reqInterceptor = this.request.interceptor;
        const resInterceptor = this.response.interceptor;
        if (reqInterceptor.onFulfilled){
            conf = reqInterceptor.onFulfilled(url, conf);
        }

        let fetchPromise = _originRequest(url, assignedConf)
            .then(res => {
                if (res.ok){
                    let prom = res.json();
                    if (responseType === 'blob') prom = res.blob();
                    if (responseType === 'text') prom = res.text();
                    if (responseType === 'arraybuffer') prom = res.arrayBuffer();
                    return prom.then(data => {
                        return resInterceptor.onFulfilled
                            ? resInterceptor.onFulfilled(data, assignedConf, res) // 可能要把response对象传给拦截器使用
                            : data;
                    });
                } else {
                    return Promise.reject({ msg: `res status:${res.status}`, res });
                }
            }).catch(err => {
                return resInterceptor.onRejected
                    ? resInterceptor.onRejected(err, assignedConf)
                    : Promise.reject(err, assignedConf);
            });
        // 添加响应拦截器, 给每个响应promise上加上then
        // if (resInterceptor.length){
        //     resInterceptor.forEach(item => {
        //         fetchPromise.then(data => {
        //             return item.onFulfilled(data, { type, ...conf });
        //         }).catch(err => {
        //             console.log(err);
        //             return item.onRejected(err, { type, ...conf });
        //         });
        //     });
        // }
        return fetchPromise;
    }
    get(url, conf = {}){
        conf.method = 'GET';
        return this.#requestAdapter(url, conf);
    }
    post(url, conf = {}){
        conf.method = 'POST';
        return this.#requestAdapter(url, conf);
    }
    put(url, conf = {}){
        conf.method = 'PUT';
        return this.#requestAdapter(url, conf);
    }
    del(url, conf = {}){
        conf.method = 'DELETE';
        return this.#requestAdapter(url, conf);
    }

}

function _create(defaultConf){
    return new Service(defaultConf);
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