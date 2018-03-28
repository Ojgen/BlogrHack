/**
 * Returns base url of blogger feeds.
 * 
 * @param {object} data 
 * @param {string} [data.blog] Domain OR id. Default: window.location.origin
 * 
 * @param {string} [data.feedType=posts] Feed type (posts | comments)
 * @param {string} [data.allow=default] Format of entry (default | summary | full)
 * * summary - preview post data (string < 400ch)
 * * full - full post body (html format)
 * * default - summary OR full (it is configured in the Blogger settings)
 * @param {string} [data.post] Post id OR comment id
 * @param {string} [data.label] Filter by label
 */
const createBaseUrl = (data) => {
    const regexIsId = /^\d+$/;
    let isBloggerLink = false;
    let url;

    if(data.blog) {
        isBloggerLink = regexIsId.test(data.blog);
        url = isBloggerLink ? `https://www.blogger.com/feeds/${data.blog}/`
            : `${data.blog}/feeds/`;
    }
    else {
        url = `${location.origin}/feeds/`;
    }
    
    url += (data.feedType || 'posts') + '/' + (data.allow || 'default');

    if(data.post) {
        // isBloggerLink - post as postId enable only with https://www.blogger.com/feeds/ based url
        if(regexIsId.test(data.post) && isBloggerLink) {
            url += `/${data.post}`;
        }
    }
    else if(data.label !== undefined) {
        url += `/-/${encodeURIComponent(data.label)}`
    }
    return url;
}

export default createBaseUrl;