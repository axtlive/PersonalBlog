const DBUtil = require('./DBUtil');


function insertEveryDay(content, ctime, success) {
    const insertSQL = "insert into every_day (`content`,`ctime`) values (?,?);";
    const params = [content, ctime];
    const connection = DBUtil.createConnection();

    connection.query(insertSQL, params, (error, result) => {
        if (!error) {
            success(result)
        } else {
            console.log(error)
        }
    });
    connection.end();
}

function queryEveryDay(success) {
    const querySQL = "select * from every_day order by id desc limit 1;";
    const connection = DBUtil.createConnection();
    const params = [];
    connection.query(querySQL, params, (error, result) => {
        if (!error) {
            console.log(result);
            success(result);

        } else {
            console.log(error)
        }
    });
    connection.end();
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;