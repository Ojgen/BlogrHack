import paramsMaker from './../../../common/utils/paramsMaker'
import createBaseUrl from './createBaseUrl'
import createParameters from './createParameters'

export default (query) => {
    let params = paramsMaker(createParameters(query), true);
    if(params) {
        params = '?' + params;
    }
    return createBaseUrl(query) + params;
}