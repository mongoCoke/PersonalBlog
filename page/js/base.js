var randomTags = new Vue({
    el:"#random_tags",
    data:{
        tags:[]
    },
    computed:{
        randomColor(){
            return function(){
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return "rgb("+ red + "," + green + "," + blue +")"
            }
        },
        randomSize(){
            return function(){
                var size = (Math.random() * 30 + 12) + "px";
                return size;
            }
        }
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryRandomTags"
        }).then(function(resp){
            var result = [];
            for (var i = 0; i < resp.data.data.length; i++){
                result.push({text:resp.data.data[i].tag + "…",link:"/?tag=" + resp.data.data[i].tag});
            }
            randomTags.tags = result;
        })
    }
})

var newHot = new Vue({
    el:"#new_hot",
    data:{
        titleList : [
            {title:"这是一个链接哈哈哈",link:"http://www.baidu.com"},
            {title:"这是一个链接哈哈哈",link:"http://www.baidu.com"},
            {title:"这是一个链接哈哈哈",link:"http://www.baidu.com"},
            {title:"这是一个链接哈哈哈",link:"http://www.baidu.com"},
        ]
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryHotBlog"
        }).then(function(resp){
            var result = [];
            for (var i = 0; i < resp.data.data.length; i++){
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id;
                result.push(temp);
            }
            newHot.titleList = result;
        })
    }
})

var newComments = new Vue({
    el:"#new_comments",
    data:{
        commentList:[
            {name:"这里是用户名",date:"2019-9-14",comment:"这是一大串评论,巴拉巴拉小魔仙"},
            {name:"这里是用户名",date:"2019-9-14",comment:"这是一大串评论,巴拉巴拉小魔仙"},
            {name:"这里是用户名",date:"2019-9-14",comment:"这是一大串评论,巴拉巴拉小魔仙"},
            {name:"这里是用户名",date:"2019-9-14",comment:"这是一大串评论,巴拉巴拉小魔仙"},
        ]
    },
    created:function(){
        axios({
            method:"get",
            url:"/queryNewComments"
        }).then(function(resp){
            console.log(resp)
            var result = [];
            for (var i = 0; i < resp.data.data.length; i++){
                var temp = {};
                temp.name = resp.data.data[i].user_name;
                temp.date = resp.data.data[i].ctime;
                temp.comment = resp.data.data[i].comments;
                result.push(temp);
            }
            newComments.commentList = result;
        })
    }
})