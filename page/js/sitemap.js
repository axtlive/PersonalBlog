const blogList = new Vue({
    el: '#blog_list',
    data(){
        return {
            blogList:[]
        }
    },
    computed:{

    },
    created(){
        axios({
            method:'get',
            url: '/queryAllBlog'
        }).then(res => {
            for(let i of res.data.data){
                i.link = '/blog_detail.html?bid=' + i.id
            }
            blogList.blogList = res.data.data;
        })
    }
});