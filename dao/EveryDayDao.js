var dbutill = require("./DBUtill");

function insertEveryDay(content,ctime,success){
    var insertSql = "insert into every_day (`content`,`ctime`) values (?,?)";
    var params = [content,ctime];
    var connection = dbutill.createConnection();
    connection.connect();
    connection.query(insertSql,params,function(error,result){
        if (error == null){
            success(result);
        }else{
            console.log(error)
        }
    })
    connection.end();
}

function queryEveryDay(success){
    var querySql = "select * from every_day order by id desc limit 1";
    var connection = dbutill.createConnection();
    connection.connect();
    connection.query(querySql,function(error,result){
        if (error == null){
            success(result);
        }else{
            console.log(error)
         }
        }
    )
    connection.end();
}

module.exports = {
    "insertEveryDay" : insertEveryDay,
    "queryEveryDay" : queryEveryDay
};
