/**
 * fetch 包装
 */
export default {
    get(url, conf){
        const params = conf.params;
        const responseType = conf.responseType;
        if (params) url += '?';
        for (const key in params) {
            url += key + '=' + params[key];
        }
        delete conf.params;
        delete conf.responseType;
        return fetch(url, conf).then(res => {
            if (responseType === 'blob') return res.blob();
            if (responseType === 'text') return res.text();
            if (responseType === 'arraybuffer') return res.arrayBuffer();
            return res.json();
        })
    },
    post(url, conf){

    }
}