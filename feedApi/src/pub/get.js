import inst from './../core/instance'
import load from './../core/load'
import createUrl from './../core/base/createUrl'
import { parseFeed } from './../parser/json/index'

const copyProps = (toObj, fromObj) => {
    for(let key in fromObj) {
        toObj[key] = fromObj[key];
    }
}

const get = (data) => {
    const query = inst.getBaseQueryObj();
    copyProps(query, data);
    return load(createUrl(query), inst.getConfig(query.isJsonp)).then(parseFeed);
}

export default get;
