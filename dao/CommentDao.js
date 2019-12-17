const dbutil = require('./DBUtil');

function insertComment(blogId, parent, parentName,userName, email, comments, ctime, utime, success) {
    const insertSQL = 'insert into comments (`blog_id`, `parent`, `parent_name`,`user_name`, `email`, `comments`, `ctime`,`utime`) values (?,?,?,?,?,?,?,?);';
    const params = [blogId, parent,parentName, userName, email, comments, ctime, utime];
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

function queryCommentsByBlogId(blogId, success) {
    const querySQL = 'select * from comments where blog_id = ?;';
    const params = [blogId];
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

function queryCommentsCountByBlogId(blogId,success){
    const querySQL = 'select count(1) as count from comments where blog_id = ?;';
    const params = [blogId];
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

function queryNewComments(size,success){
    const querySQL = 'select * from comments order by id desc limit ?;';
    const params = [size];
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

module.exports.insertComment = insertComment;
module.exports.queryCommentsByBlogId = queryCommentsByBlogId;
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;
module.exports.queryNewComments = queryNewComments;
