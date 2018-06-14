import checkUrl from './../utils/checkUrl'
import instance from './../core/instance'
import get from './../core/get'


 /**
 * Sets data
 * 
 * @param {object} data
 * @param {string} [data.blog] Blog id OR domain
 * @param {number} [data.timeout] 
 * @param {boolean} [data.isInsecureRequests=false] 
 * @param {(number|string)} [data.version=2]
 */
const init = (data = {}) => {
    const info = {};
    const config = {
        timeout : data.timeout,
        isInsecureRequests : data.isInsecureRequests
    };

    instance.setConfig(config); // remove it?

    let blog = data.blog ? data.blog.toString() : location.origin;
    let func = /^\d+$/.test(blog) ? blogId : blogUrl;

    const query = {
        version : data.version || 2,
        maxResults : 0
    };

    return func(blog, query, info, config).then(resp => {
        instance.setInitData(resp, info, config);
        return resp;
    });
}


const blogUrl = (url, query, info, config) => {
    query.blog = checkUrl(url, info, config);
    query.isJsonp = config.isJsonp;

    return get(query, config).then(resp => resp.blog);
}

const blogId = (id, query, info, config) => {
    let blogInfo;
    query.blog = id;
    query.isJsonp = config.isJsonp = true;
    
    return get(query, config).then(resp => {
        blogInfo = resp.blog;
        query.blog = checkUrl(blogInfo.url, info, config);
        query.isJsonp = config.isJsonp;
        return get(query, config);
    })
    .then(resp => {
        const postCount = blogInfo.postCount;
        blogInfo = resp.blog;
        blogInfo.postCount_ = postCount;
        return blogInfo;
    });
}


export default init;