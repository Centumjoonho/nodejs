var mysql = require('mysql');

var connection = mysql.createConnection({
    host : '',
    user : '',
    password : '',
    database : ''
  });
  
  connection.connect();
// 단일 api export 하는 경우 
module.exports =connection;