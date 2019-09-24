var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tagBlogMappingDao =  require("../dao/TagBlogMappingDao");
var commentDao = require("../dao/CommentDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var captcha = require("svg-captcha");
var url = require("url");

var path = new Map();
function addComment(request,response){
    var params = url.parse(request.url,true).query;
    console.log(params)
    commentDao.insertComment(parseInt(params.bid),parseInt(params.parent),params.parentName,params.userName,params.email,params.content,timeUtil.getNow(),timeUtil.getNow(),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","评论成功",null));
        response.end();
    });
}
path.set("/addComment",addComment);

function queryRandomCode(request,response){
    var img = captcha.create({fontSize:50,width:100,height:34});
    // console.log(img.data)
    response.writeHead(200);
    response.write(respUtil.writeResult("success","评成功",img));
    response.end();
}
path.set("/queryRandomCode",queryRandomCode);

function queryCommentByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    commentDao.queryCommentByBlogId(parseInt(params.bid),function(result){
        // console.log(result)
        response.writeHead(200);
        response.write(respUtil.writeResult("success","评论成功",result));
        response.end();
    })
}
path.set("/queryCommentByBlogId",queryCommentByBlogId);

function queryCommentsCountByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    commentDao.queryCommentsCountByBlogId(parseInt(params.bid),function(result){
        // console.log(result)
        response.writeHead(200);
        response.write(respUtil.writeResult("success","评论成功",result));
        response.end();
    })
}
path.set("/queryCommentsCountByBlogId",queryCommentsCountByBlogId);

function queryNewComments(request,response){
    commentDao.queryNewComments(5,function(result){
        // console.log(result)
        response.writeHead(200);
        response.write(respUtil.writeResult("success","评论成功",result));
        response.end();
    })
}
path.set("/queryNewComments",queryNewComments);

module.exports.path = path;