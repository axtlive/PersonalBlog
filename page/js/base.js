const randomTags = new Vue({
    el: '#random_tags',
    data() {
        return {
            tags: ['Vue', 'React', 'Angular', 'Html', 'Css', 'Javascript', 'Nodejs', 'C++', 'PHP', 'Java', 'Python', 'C', 'Go', 'Webpack', 'Redux',
                'Vuex', 'Element', 'Antd', 'ES6', 'k8s', 'Centos', 'Linux', 'MySQL']
        }
    },
    computed: {
        randomColor() {
            return function () {
                const red = Math.random() * 255 + 50;
                const green = Math.random() * 255 + 50;
                const blue = Math.random() * 255 + 50;
                return 'rgb(' + red + ',' + green + ',' + blue + ')'
            }
        },
        randomSize() {
            return function () {
                return (Math.random() * 20 + 12) + 'px';
            }
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/queryRandomTags'
        }).then(res => {
            console.log(res);
            const result = [];
            for (let i of res.data.data) {
                result.push({text: i.tag, link: '/?tag=' + i.tag});
            }
            this.tags = result;
        }).catch(res => {
            console.log('请求失败')
        })
    }
});

const newHot = new Vue({
    el: '#new_hot',
    data() {
        return {
            titleList: [
                {
                    title: '这是一个链接',
                    link: 'http://www.baidu.com',
                }, {
                    title: '这是一个链接',
                    link: 'http://www.baidu.com',
                }, {
                    title: '这是一个链接',
                    link: 'http://www.baidu.com',
                }, {
                    title: '这是一个链接',
                    link: 'http://www.baidu.com',
                }, {
                    title: '这是一个链接',
                    link: 'http://www.baidu.com',
                },
            ]
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/queryHotBlog'
        }).then(res => {
            const result = [];
            for (let i of res.data.data) {
                const temp = {};
                temp.title = i.title;
                temp.link = '/blog_detail.html?bid=' + i.id;
                result.push(temp);
            }
            this.titleList = result;
        }).catch(res => {
            console.log('请求失败')
        })
    }
});

const newComments = new Vue({
    el: '#new_comments',
    data() {
        return {
            commentList: [
                {
                    name: '这是用户名',
                    date: '2019-12-12',
                    comment: '这是很长的一串评论的内容'
                }, {
                    name: '这是用户名',
                    date: '2019-12-12',
                    comment: '这是很长的一串评论的内容'
                }, {
                    name: '这是用户名',
                    date: '2019-12-12',
                    comment: '这是很长的一串评论的内容'
                }, {
                    name: '这是用户名',
                    date: '2019-12-12',
                    comment: '这是很长的一串评论的内容'
                }, {
                    name: '这是用户名',
                    date: '2019-12-12',
                    comment: '这是很长的一串评论的内容'
                }, {
                    name: '这是用户名',
                    date: '2019-12-12',
                    comment: '这是很长的一串评论的内容'
                },
            ]
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/queryNewComments'
        }).then(res => {
            const result = [];
            for (let i of res.data.data) {
                const temp = {};
                temp.name = i.user_name;
                temp.date = i.ctime;
                temp.comment = i.comments;
                result.push(temp);
            }
            this.commentList = result;
        }).catch(res => {
            console.log('请求失败')
        })
    }
});