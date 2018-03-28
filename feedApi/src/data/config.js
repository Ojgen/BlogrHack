const defConfig = {
    isJsonp : false,
    timeout : null
};

let curConfig;

const joinConfig = (config) => {
    return {
        isJsonp : config.isJsonp || defConfig.isJsonp,
        timeout : config.timeout || defConfig.timeout
    }
}

/**
 * 
 * @param {object} config 
 */
const setConfig = (config = {}) => {
    curConfig = joinConfig(config);
}
/**
 * Get current config modefied by parameter object
 * 
 * @param {object} [config] Config of query
 * @returns {object} Config object
 */
const getConfig = (config) => {
    if(!config || config === curConfig)
        return curConfig;

    return joinConfig(config);
}

// init config
setConfig();


export {
    setConfig,
    getConfig
}