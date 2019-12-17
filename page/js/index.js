const everyDay = new Vue({
    el: '#every_day',
    data() {
        return {
            content: '你好啊你好啊啊啊啊啊啊'
        }
    },
    computed: {
        getContent() {
            return this.content
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/queryEveryDay'
        }).then(res => {
            everyDay.content = res.data.data[0].content;
        }).catch(res => {
            console.log('失败')
        })
    }
});

const articleList = new Vue({
    el: '#article_list',
    data() {
        return {
            page: 1,
            pageSize: 5,
            count: 100,
            pageNumList: [],
            articleList: [
                {
                    title: 'Larvae5.4安装passport时遇到的一些问题',
                    content: '安装时可能不支持高版本，我使用了composer require /passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\\Passport\\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...\n',
                    date: '2019-12-12',
                    views: '66',
                    tags: 'test1 test2',
                    id: '1',
                    link: '/'
                },
                {
                    title: 'Larvae5.4安装passport时遇到的一些问题',
                    content: '安装时可能不支持高版本，我使用了composer require /passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\\Passport\\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...\n',
                    date: '2019-12-12',
                    views: '66',
                    tags: 'test1 test2',
                    id: '1',
                    link: '/'
                },
                {
                    title: 'Larvae5.4安装passport时遇到的一些问题',
                    content: '安装时可能不支持高版本，我使用了composer require /passport ~4.0安装后执行迁移时nothing to migrate，需要手动注册Provider， 在config/app.php中providers中添加Laravel\\Passport\\PassportServiceProvider::class。执行php artisan passport:install时提示“There are no commands defined in the “passport” namespace.” 需要执行cache:clear和config:cache 更新缓存。...\n',
                    date: '2019-12-12',
                    views: '66',
                    tags: 'test1 test2',
                    id: '1',
                    link: '/'
                },
            ]
        }
    },
    computed: {
        jumpTo() {
            return function (page) {
                this.getPage(page, this.pageSize)
            }
        },
        getPage() {
            return function (page, pageSize) {
                let searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
                let tag = '';
                for (let i of searchUrlParams) {
                    if (i.split('=')[0] === 'tag') {
                        try {
                            tag = i.split('=')[1]
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
                if (tag === '') {
                    axios({
                        method: 'get',
                        url: '/queryBlogByPage?page=' + (page - 1) + '&pageSize=' + pageSize
                    }).then(res => {
                        const result = res.data.data;
                        const list = [];
                        for (let i of result) {
                            const temp = {};
                            temp.title = i.title;
                            temp.content = i.content;
                            temp.date = i.ctime;
                            temp.views = i.views;
                            temp.tags = i.tags;
                            temp.id = i.id;
                            temp.link = '/blog_detail.html?bid=' + i.id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(res => {
                        console.log('请求错误')
                    });
                    axios({
                        method: 'get',
                        url: '/queryBlogCount',
                    }).then(res => {
                        articleList.count = res.data.data[0].count;
                        articleList.generatePageTool;
                    })
                } else {
                    axios({
                        method: 'get',
                        url: '/queryByTag?page=' + (page - 1) + '&pageSize=' + pageSize + '&tag=' + tag
                    }).then(res => {
                        const result = res.data.data;
                        const list = [];
                        for (let i of result) {
                            const temp = {};
                            temp.title = i.title;
                            temp.content = i.content;
                            temp.date = i.ctime;
                            temp.views = i.views;
                            temp.tags = i.tags;
                            temp.id = i.id;
                            temp.link = '/blog_detail.html?bid=' + i.id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(res => {
                        console.log('请求错误')
                    });
                    axios({
                        method: 'get',
                        url: '/queryByTagCount?tag=' + tag,
                    }).then(res => {
                        articleList.count = res.data.data[0].count;
                        articleList.generatePageTool;
                    })
                }
            }
        },
        generatePageTool() {
            const nowPage = this.page;
            const pageSize = this.pageSize;
            const totalCount = this.count;
            const result = [];
            result.push({text: '<<', page: 1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page: nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page: nowPage - 1});
            }
            result.push({text: nowPage, page: nowPage});
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 1, page: nowPage + 1})
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 2, page: nowPage + 2})
            }
            result.push({text: '<<', page: parseInt((totalCount + pageSize - 1) / pageSize)});
            this.pageNumList = result;
        }
    },
    created() {
        this.getPage(this.page, this.pageSize)
    }
});