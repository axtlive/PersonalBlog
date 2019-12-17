const everyDayDao = require('../dao/EveryDayDao');
const timeUtil = require('../util/TimeUtil');
const respUtil = require('../util/RespUtil');


const path = new Map();

function editEveryDay(request, response) {
    request.on('data', data => {
        everyDayDao.insertEveryDay(data.toString(), timeUtil.getNow(), result => {
            response.writeHead(200,{'content-type': 'application/json',});
            response.write(respUtil.writeResult('success','成功', null));
            response.end()
        })
    })
}
path.set('/editEveryDay', editEveryDay);


function queryEveryDay(request, response) {
        everyDayDao.queryEveryDay(result => {
            response.writeHead(200,{'content-type': 'application/json',});
            response.write(respUtil.writeResult('success','成功', result));
            response.end();
        })
}
path.set('/queryEveryDay', queryEveryDay);

module.exports.path = path;