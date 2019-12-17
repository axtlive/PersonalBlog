const fs = require('fs');

const globalConfig = {};

const conf = fs.readFileSync('./server.conf');

const configArr = conf.toString().split('\n');

for(let i of configArr){
    globalConfig[i.split('=')[0].trim()] = i.split('=')[1];
}
// console.log(globalConfig);
module.exports = globalConfig;