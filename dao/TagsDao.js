const dbutil = require('./DBUtil');

function insertTag(tag, ctime, utime, success) {
    const insertSQL = 'insert into tags (`tag`,`ctime`,`utime`) values (?,?,?);';
    const params = [tag, ctime, utime];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSQL, params, (error, result) => {
        if(!error){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

function queryTag(tag, success) {
    const querySQL = 'select * from tags where tag = ?;';
    const params = [tag];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySQL, params, (error, result) => {
        if(!error){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

function queryAllTag(success) {
    const querySQL = 'select * from tags;';
    const params = [];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySQL, params, (error, result) => {
        if(!error){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}


module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;