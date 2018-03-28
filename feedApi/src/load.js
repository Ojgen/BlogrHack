import generateId from './../../common/utils/generateId'

// jsonp
const removeJsonpQuery = (id, script) => {
    document.head.removeChild(script);
    delete window[id];
}
const sendJsonpQuery = (url, cb) => {
    let id = generateId('feedcb');
    let script = document.createElement('script');
    script.src = url + '&callback='+id;
    window[id] = (resp) => {
        cb(resp);
        removeJsonpQuery(id, script);
    };
    document.head.appendChild(script);
    return () => removeJsonpQuery(id, script);
}


/**
 * 
 * @param {string} url 
 * @param {object} config 
 * @param {boolean} config.isJsonp 
 * @param {number} config.timeout 
 */
const load = (url, config = {}) => {
    return new Promise((resolve, reject) => {
        let abort, timeoutId;

        const success = (resp) => {
            if(timeoutId) {
                clearTimeout(timeoutId);
            }
            resolve(resp);
        }

        if(config.isJsonp) {
            abort = sendJsonpQuery(url, success);
        }
        else {
			// abort - to use abort controller?
            fetch(url).then(resp => resp.json()).then(success);
        }

        if(config.timeout) {
            timeoutId = setTimeout(() => {
                if(abort) {
					abort();
				}
                reject(new Error('Request timed out'));
            }, config.timeout);
        }
    });
}

export default load;
