/**
 * Returns string with url parameters
 * 
 * @param {object} params An object with parameters
 * @param {boolean} isInvalidFilter If need to filter invalid values
 */
export default (params, isInvalidFilter) => {
    if(typeof params !== 'object') {
        return '';
    }
    let i=0, res = '';
    for(let k in params) {
        if(isInvalidFilter) {    
            if(!params[k]) {
                // params[k] === (false | 0 | 0.0 | '') ?
                continue;
            }
        }    
        res += (i++===0?'':'&') + k + '=' + encodeURIComponent(params[k]);
    }
    return res;
}