var mysql = require("mysql");

function createConnection(){
    var connection = mysql.createConnection({
        host:"192.168.0.103",
        post:"3306",
        user:"root",
        password:"123456",
        database:"my_blog"
    })
    return connection;
}

module.exports.createConnection = createConnection;