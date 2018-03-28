/**
 * Returns an object with parameters
 * 
 * @param {object} data 
 * @param {(number|string)} [data.post] Post id, path OR full url. format:
 * * [domain]/yyyy/mm/post-name.html
 * 
 * @param {(number|string)} [data.maxResults=25] Count of posts that will return per query
 * @param {(number|string)} [data.startIndex=1] Start index
 * 
 * @param {string} [data.publishedMin]
 * @param {string} [data.publishedMax] 
 * @param {string} [data.updatedMin]
 * @param {string} [data.updatedMax]
 * 
 * @param {string} [data.query] Search query string
 * 
 * @param {boolean} [data.byDate]
 * @param {string} [orderBy] 
 * (lastmodified | starttime | updated | published)
 * 
 * @param {string} [data.alt] 
 * (rss | json | json-in-script | atom-in-script | rss-in-script | atom-service) 
 * @param {boolean} [data.isJsonp=false] 
 * @param {(number|string)} [data.version=2] Feed version 
 * @param {boolean} [data.redirect]
 */
const createPath = (data) => {
    const res = {
        alt : data.alt ? data.alt : (data.isJsonp ? 'json-in-script' : 'json'),
        v : parseInt(data.version || '2'),
        redirect :  data.redirect
    };

    if(data.post) {
        let post = data.post.toString();
        // post is id
        if(/^\d+$/.test(post)) {
            return res;
        }
        // post is url/path
        else if(post = post.match(/\d{4}\/\d{2}.+/)) {
            // fix: if before 'yyyy/mm/title.html' not '/' will be error
            res.path = '/' + post;
            return res;
        }
    }

    res['max-results'] = parseInt(data.maxResults);
    res['start-index'] = parseInt(data.startIndex);

    res['published-min'] = data.publishedMin;
    res['published-max'] = data.publishedMax;
    res['updated-min'] = data.updatedMin;
    res['updated-max'] = data.updatedMax;
    res['by-date'] = data.byDate;
    res['orderby'] = data.orderBy;

    res.q = data.query;

    return res;
}

export default createPath;