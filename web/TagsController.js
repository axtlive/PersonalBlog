const blogDao = require('../dao/BlogDao');
const tags = require('../dao/TagsDao');
const tagBlogMapping = require('../dao/TagBlogMappingDao');
const timeUtil = require('../util/TimeUtil');
const respUtil = require('../util/RespUtil');
const url = require('url');

const path = new Map();

function queryRandomTags(request, response) {
    tags.queryAllTag(result => {
        result.sort(() => {
            return Math.random() > 0.5;
        });
        response.writeHead(200, {'content-type': 'application/json',});
        response.write(respUtil.writeResult('success', '查询成功', result));
        response.end();
    })
}

path.set('/queryRandomTags', queryRandomTags);

function queryByTag(request, response) {
    const params = url.parse(request.url, true).query;
    tags.queryTag(params.tag, result => {
        if (result === null || result.length === 0) {
            response.writeHead(200, {'content-type': 'application/json',});
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        } else {
            tagBlogMapping.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), result => {
                const blogList = [];
                for (let i of result) {
                    blogDao.queryBlogById(i.blog_id, result => {
                        blogList.push(result[0])
                    })
                }
                getResult(blogList, result.length, response);
            })
        }
    })
}

path.set('/queryByTag', queryByTag);

function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(() => {
            getResult(blogList, len, response)
        }, 10)
    } else {
        for (let i of blogList) {
            const re1 = new RegExp("<.+?>", "g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
            i.content = i.content.replace(re1, '');
            // i.content = i.content.replace(/<img[\w\W]*>/,'');
            // i.content = i.content.replace(/<[\w\W]{1,9}>/g,'');
            i.content = i.content.substring(0, 300);
        }
        response.writeHead(200, {'content-type': 'application/json',});
        response.write(respUtil.writeResult('success', '查询成功', blogList));
        response.end();
    }
}

function queryByTagCount(request, response) {
    const params = url.parse(request.url, true).query;
    tags.queryTag(params.tag, result => {
        tagBlogMapping.queryByTagCount(result[0].tag_id, result => {
            response.writeHead(200, {'content-type': 'application/json',});
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        })
    })
}

path.set('/queryByTagCount', queryByTagCount);

module.exports.path = path;