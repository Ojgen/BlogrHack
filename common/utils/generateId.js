export default (prefix='_id', sep='_') => {
    return `${prefix}${sep}${Date.now()}${sep}${Math.ceil(Math.random()*100000)}`;
}