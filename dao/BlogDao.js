const dbutil = require('./DBUtil');

function insertBlog(title, content, tags, views, ctime, utime, success) {
    const insertSQL = 'insert into blog (`title`,`content`,`tags`,`views`,`ctime`,`utime`) values (?,?,?,?,?,?);';
    const params = [title, content, tags, views, ctime, utime,];
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

function queryBlogByPage(page, pageSize, success) {
    const querySQL = 'select * from blog order by id  desc limit ?,?;';
    const params = [page * pageSize, pageSize];
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

function queryBlogById(id, success) {
    const querySQL = 'select * from blog where id = ?;';
    const params = [id];
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

function queryBlogCount( success) {
    const querySQL = 'select count(1) as count from blog;';
    const params = [];
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

function queryAllBlog( success) {
    const querySQL = 'select * from blog order by id desc;';
    const params = [];
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

function addViews(id, success){
    const updateSQL = 'update blog set views = views + 1 where id = ?;';
    const params = [id];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSQL, params, (error, result) => {
        if (!error) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryHotBlog(size, success){
    const updateSQL = 'select * from blog order by views desc limit ?;';
    const params = [size];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSQL, params, (error, result) => {
        if (!error) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;

