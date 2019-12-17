const dbutil = require('./DBUtil');

function insertTagBlogMapping(tagId, blogId, ctime, utime, success) {
    const insertSQL = 'insert into tag_blog_mapping (`tag_id`,`blog_id`,`ctime`,`utime`) values (?,?,?,?);';
    const params = [tagId, blogId, ctime, utime];

    const connection = dbutil.createConnection();
    connection.connect();

    connection.query(insertSQL, params, (error, result) => {
        if (!error) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryByTag(tagId, page, pageSize, success) {
    const querySQL = 'select * from tag_blog_mapping where tag_id = ? limit ?, ?;';
    const params = [tagId, page * pageSize, pageSize];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySQL, params, (error, result) => {
        if (!error) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryByTagCount(tagId, success) {
    const querySQL = 'select count(1) as count from tag_blog_mapping where tag_id = ?;';
    const params = [tagId];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySQL, params, (error, result) => {
        if (!error) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;
module.exports.queryByTagCount = queryByTagCount;