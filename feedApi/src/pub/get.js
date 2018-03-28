import { getConfig } from './../data/config'
import createUrl from './../base/createUrl' 

import load from './../load'


const get = (data, config) => {
    config = getConfig(config);
    data.isJsonp = config.isJsonp;
    return load(createUrl(data), config);
}

export default get;
