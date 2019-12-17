const fs = require('fs');

const globalConfig = require('./config');

const controllerSet = [];
const pathMap = new Map();

const files = fs.readdirSync(globalConfig['web_path']);

for (let i of files) {
    const temp = require('./' + globalConfig['web_path'] + '/' + i);
    if (temp.path) {
        for (let [k, v] of temp.path) {
            if (!pathMap.get(k)) {
                pathMap.set(k, v)
            } else {
                throw new Error('url异常，url 是：' + k)
            }
        }
        controllerSet.push(temp)
    }
}

module.exports = pathMap;