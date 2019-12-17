const blogDetail = new Vue({
    el: '#blog_detail',
    data() {
        return {
            title: '',
            content: '',
            ctime: '',
            tags: '',
            views: '',
        }
    },
    computed: {},
    created() {
        const searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
        if (searchUrlParams === '') {
            return false;
        }
        let bid = -1;
        for (let i of searchUrlParams) {
            if (i.split('=')[0] === 'bid') {
                try {
                    bid = parseInt(i.split('=')[1])
                } catch (e) {
                    console.log(e)
                }
            }
        }
        axios({
            method: 'get',
            url: '/queryBlogById?bid=' + bid
        }).then(res => {
            const result = res.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.ctime = result.ctime;
            blogDetail.tags = result.tags;
            blogDetail.views = result.views;
        }).catch(res => {
                console.log('请求失败')
            }
        )
    }
});

const sendComment = new Vue({
    el: '#send_comment',
    data() {
        return {
            vCode: '',
            rightCode: '',
            warn: ''
        }
    },
    computed: {
        changeCode() {
            return function () {
                axios({
                    method: 'get',
                    url: '/queryRandomCode'
                }).then(res => {
                    sendComment.vCode = res.data.data.data;
                    sendComment.rightCode = res.data.data.text.toLowerCase();
                }).catch(res => {
                    console.log('请求失败')
                })
            }
        },
        sendComment() {
            return function () {
                const code = document.getElementById('comment_code').value.toLowerCase();
                if (code !== sendComment.rightCode) {
                    sendComment.warn = '验证码错误';
                    // alert('验证码错误');
                    return;
                }
                const searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
                let bid = -1;
                for (let i of searchUrlParams) {
                    if (i.split('=')[0] === 'bid') {
                        try {
                            bid = parseInt(i.split('=')[1])
                        } catch (e) {
                            console.log(e)
                        }
                    }
                }
                const reply = document.getElementById('comment_reply').value;
                const replyName = document.getElementById('comment_reply_name').value;
                const name = document.getElementById('comment_name').value;
                const email = document.getElementById('comment_email').value;
                const content = document.getElementById('comment_content').value;
                axios({
                    method: 'get',
                    url: '/addComment?bid=' + bid + '&parent=' + reply + '&userName=' + name + '&email=' + email + '&content=' + content + '&parentName=' + replyName
                }).then(res => {
                    sendComment.warn = '';
                    alert(res.data.msg)
                }).catch(res => {
                    console.log('请求错误')
                })
            }
        }
    },
    created() {
        this.changeCode();
    }
});

const blogComments = new Vue({
    el: '#blog_comments',
    data() {
        return {
            total: 100,
            comments: [],
        }
    },
    computed: {
        reply() {
            return function (commentId, userName) {
                document.getElementById('comment_reply').value = commentId;
                document.getElementById('comment_reply_name').value = userName;
                location.href = '#send_comment';
            }
        }
    },
    created() {
        let searchUrlParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : '';
        let bid = -1;
        for (let i of searchUrlParams) {
            if (i.split('=')[0] === 'bid') {
                try {
                    bid = parseInt(i.split('=')[1])
                } catch (e) {
                    console.log(e)
                }
            }
        }
        axios({
            method: 'get',
            url: '/queryCommentsByBlogId?bid=' + bid
        }).then(res => {
            blogComments.comments = res.data.data;
            for (let i of blogComments.comments) {
                if (i.parent > -1) {
                    i.options = '回复@' + i.parent_name
                }
            }
        }).catch(res => {
            console.log('请求失败')
        });
        axios({
            method: 'get',
            url: '/queryCommentsCountByBlogId?bid=' + bid
        }).then(res => {
            blogComments.total = res.data.data[0].count
        }).catch(res => {
            console.log('请求失败')
        });
    }
});