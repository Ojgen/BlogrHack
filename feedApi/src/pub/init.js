import { setConfig } from './../data/config'
import setBlog from './setBlog'

/**
 * Sets data
 * 
 * @param {object} data
 * @param {string} [data.blog] Blog id OR domain
 * @param {object} [data.config] 
 * @param {boolean} [data.config.isJsonp] 
 * @param {number} [data.config.timeout] 
 */
const init = (data) => {
    if(!data)
        return;

    if(data.config) {
        setConfig(data.config);
    }
    if(data.blog) {
        setBlog(data.blog);
    }
}

export default init;