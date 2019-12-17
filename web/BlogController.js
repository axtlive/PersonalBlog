const blogDao = require('../dao/BlogDao');
const tags = require('../dao/TagsDao');
const tagBlogMapping = require('../dao/TagBlogMappingDao');
const timeUtil = require('../util/TimeUtil');
const respUtil = require('../util/RespUtil');
const url = require('url');

const path = new Map();

function queryAllBlog(request,response) {
    blogDao.queryAllBlog(result => {
        response.writeHead(200,{'content-type': 'application/json',});
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })
}
path.set('/queryAllBlog',queryAllBlog);

function queryHotBlog(request,response) {
    blogDao.queryHotBlog(5,result => {
        response.writeHead(200,{'content-type': 'application/json',});
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })
}
path.set('/queryHotBlog',queryHotBlog);

function queryBlogById(request,response) {
    const params = url.parse(request.url,true).query;
    blogDao.queryBlogById(parseInt(params.bid),result => {
        response.writeHead(200,{'content-type': 'application/json',});
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
        blogDao.addViews(parseInt(params.bid),result =>{})
    })
}
path.set('/queryBlogById',queryBlogById);

function queryBlogCount(request,response){
    blogDao.queryBlogCount(result => {
        response.writeHead(200,{'content-type': 'application/json',});
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })
}
path.set('/queryBlogCount',queryBlogCount);

function queryBlogByPage(request,response){
    const params = url.parse(request.url,true).query;
    blogDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),result =>{
        for(let i of result){
            const re1 = new RegExp("<.+?>", "g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
            i.content = i.content.replace(re1,'');
            // i.content = i.content.replace(/<img[\w\W]*>/,'');
            // i.content = i.content.replace(/<[\w\W]{1,9}>/g,'');
            i.content = i.content.substring(0,300);
        }
        response.writeHead(200,{'content-type': 'application/json',});
        response.write(respUtil.writeResult('success','查询成功',result));
        response.end();
    })
}
path.set('/queryBlogByPage',queryBlogByPage);

// 新建编辑博客接口
function editBlog(request, response) {
    // 拿到url上拼接的参数
    const params = url.parse(request.url, true).query;
    // 拿到url 上面拼接的tags标签并做格式化处理
    const tags = params.tags.replace(/ /g, '').replace('，', ',');
    // 请求有数据相应时进行博客的插入
    request.on('data', data => {
        blogDao.insertBlog(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), result => {
            response.writeHead(200,{'content-type': 'text/plain;charset=utf-8',});
            response.write(respUtil.writeResult('success', '添加成功', null));
            response.end();
            // blogId即刚才插入的时候自动递增的id
            const blogId = result.insertId;
            // 标签以逗号分隔
            const tagList = tags.split(',');
            // 遍历标签数组 如果不为空则查询
            for (let i of tagList) {
                if (i === '') {
                    continue;
                }
                // 查询判断是否已经存在数据库
                queryTag(i, blogId);
            }
        })
    })
}
path.set('/editBlog', editBlog);

// 查询数据库中的标签是否存在
function queryTag(tag, blogId) {
    tags.queryTag(tag, result => {
        // 如果没有则插入这个标签
        if (result === null || result.length === 0) {
            insertTag(tag, blogId);
        } else {
            // 如果有则建立标签id和博客id的一个映射关系
            tagBlogMapping.insertTagBlogMapping(result[0].id, blogId,timeUtil.getNow(),timeUtil.getNow(),result =>{})
        }
    })
}

// 向数据库插入标签
function insertTag(tag, blogId) {
    tags.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), result => {
        // 插入完成后再建立标签id和博客id的一个映射关系
        insertTagBlogMapping(result.insertId, blogId);
    })
}

// 建立标签id和博客id的一个映射关系
function insertTagBlogMapping(tagId, blogId) {
    tagBlogMapping.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), result => {})
}


module.exports.path = path;