var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'wnsgh774',
    database : 'nodejs_jooncoding'
  });
  
  connection.connect();
// 단일 api export 하는 경우 
module.exports =connection;