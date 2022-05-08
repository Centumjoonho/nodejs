var mysql = require('mysql');
//mysql 모듈을 사용하겠다. 

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'wnsgh774',
  database : 'nodejs_jooncoding'
});
//createConnection 함수 인자 호출
//나의 mysql과 동일하게 세팅 ! 
 
connection.connect();
 
connection.query('SELECT * FROM topic', function (error, results, fields) {
  if (error) {
      console.log(error);
  }
  console.log(results);
});
 