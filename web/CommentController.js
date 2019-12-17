const blogDao = require('../dao/BlogDao');
const tags = require('../dao/TagsDao');
const commentDao = require('../dao/CommentDao');
const tagBlogMapping = require('../dao/TagBlogMappingDao');
const timeUtil = require('../util/TimeUtil');
const respUtil = require('../util/RespUtil');
const url = require('url');
const captcha = require('svg-captcha');

const path = new Map();

function addComment(request, response) {
    const params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), result => {
        response.writeHead(200, {'content-type': 'application/json',});
        response.write(respUtil.writeResult('success', '评论成功', null));
        response.end();
    })
}
path.set('/addComment', addComment);


function queryRandomCode(request, response) {
    const img = captcha.create({fontSize: 50, width: 100, height: 35});
    response.writeHead(200);
    response.write(respUtil.writeResult('success', '成功', img));
    response.end();
}
path.set('/queryRandomCode', queryRandomCode);

function queryCommentsByBlogId(request, response) {
    const params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid), result => {
        response.writeHead(200, {'content-type': 'application/json',});
        response.write(respUtil.writeResult('success', '成功', result));
        response.end();
    })
}
path.set('/queryCommentsByBlogId', queryCommentsByBlogId);

function queryCommentsCountByBlogId(request,response){
    const params = url.parse(request.url, true).query;
    commentDao.queryCommentsCountByBlogId(parseInt(params.bid), result => {
        response.writeHead(200, {'content-type': 'application/json',});
        response.write(respUtil.writeResult('success', '成功', result));
        response.end();
    })
}
path.set('/queryCommentsCountByBlogId',queryCommentsCountByBlogId);


function queryNewComments(request,response){
    commentDao.queryNewComments(5, result => {
        response.writeHead(200, {'content-type': 'application/json',});
        response.write(respUtil.writeResult('success', '成功', result));
        response.end();
    })
}
path.set('/queryNewComments',queryNewComments);

module.exports.path = path;