var everyDay = new Vue({
    el:"#every_day",
    data:{
        content:"fasdfsdaf"
    },
    computed:{
        getContent:function(){
            return this.content;
        }
    },
    created:function(){
      //请求数据，给content赋值
        axios({
            method:"get",
            url:"/queryEveryDay",
        }).then(function(resp){
            everyDay.content = resp.data.data[0].content;
        }).catch(function(resp){
            console.log("请求失败！");
        })
    }
})

var articleList = new Vue({
    el:"#article_list",
    data:{
        page:1,
        pageSize:5,
        count:1100,
        pageNumList:[],
        articleList:[{
            title: "四联杀幽门螺杆菌第三天",
            content: "前段时间总是干呕暖气，吃饭很容易饱，饭后恶心想吐，喝咖啡后更剧烈。前段时间总是干呕暖气，吃饭很容易饱，饭后恶心想吐，喝咖啡后更剧烈。前段时间总是干呕暖气，吃饭很容易饱，饭后恶心想吐，喝咖啡后更剧烈。前段时间总是干呕暖气，吃饭很容易饱，饭后恶心想吐，喝咖啡后更剧烈。",
            date:"2018-10-10",
            views:"101",
            tags:"test1 test2",
            id:"1",
            link:""
        }]
    },
    computed:{
        jumpTo:function(){
            return function(page){
                this.getPage(page,this.pageSize)
            }
        },
        getPage:function(){
            return function(page,pageSize){
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";
                for (var i = 0; i < searchUrlParams.length; i++){
                    if (searchUrlParams[i].split("=")[0] == "tag"){
                        try{
                            tag = searchUrlParams[i].split("=")[1];
                        }catch (e) {
                            console.log(e)
                        }
                    }
                }
                if (tag == ""){//不是查询情况
                    axios({
                        method:"get",
                        url:"/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then(function(resp){
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function(){
                        console.log("请求错误！")
                    });
                    axios({
                        method:"get",
                        url:"/queryBlogCount"
                    }).then(function(resp){
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    })
                }else{
                    axios({
                        method:"get",
                        url:"/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
                    }).then(function(resp){
                        console.log(resp);
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function(){
                        console.log("请求错误！")
                    });
                    axios({
                        method:"get",
                        url:"/queryByTagCount?tag=" + tag
                    }).then(function(resp){
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    })
                }


            }
        },
        generatePageTool:function(){
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<",page:1});
            if (nowPage > 2){
                result.push({text:nowPage - 2,page:nowPage - 2})
            }
            if (nowPage > 1){
                result.push({text:nowPage - 1,page:nowPage - 1})
            }
            result.push({text:nowPage,page:nowPage})
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize){
                result.push({text:nowPage + 1,page:nowPage + 1})
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize){
                result.push({text:nowPage + 2,page:nowPage + 2})
            }
            result.push({text:">>",page:parseInt(totalCount + pageSize - 1) / pageSize});
            articleList.pageNumList = result;
            return result;
        }
    },
    created:function(){
        this.getPage(this.page,this.pageSize);
    }
})