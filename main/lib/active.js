// 함수 캡슐화 진행시 !! 필요한 모듈 항상 확인 
var connection = require('./db');
var template = require('./template.js');
var http = require('http');
var url = require('url'); // 모듈 (node.js)
var qs = require('querystring');
const { findSourceMap } = require('module');
//api 여러개 제공할 때는 exports / 1개 단일 제공시 module.exports 



exports.home = function(request,response){

connection.query(`SELECT * FROM topic`, function(error, topics){
             
        var title = '';
        var description = '';
    
        var filelist = template.list(topics);
        var html = template.html(title ,filelist ,
            `<h2>그들의 활동</h2>
             <br>종주중독은 어떤 활동을 할까?</br>
             <h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`,"");
    
        response.writeHead(200);
        response.end(html);
    });
    
};
exports.create_process  = function(request,response){
    var body = "";
    request.on("data", function(data){
      body = body + data;
 
    });
    request.on("end",function(){
      var post = qs.parse(body);
 
      connection.query(`
      INSERT INTO author (name, profile) 
        VALUES( ? , ? )`,
        [post.name, post.profile],function(error,result){
          if(error){
           throw error;
          }
          response.writeHead(302,{Location:`/author`});
          response.end();
        })
    });
}

exports.update = function(request,response){
    connection.query(`SELECT * FROM topic`, function(error, topics){
        connection.query(`SELECT * FROM author`, function(error2, authors){
            var _url = request.url;
            var queryData = url.parse(_url, true).query;
            connection.query(`SELECT * FROM author WHERE id=?`,[queryData.id] ,function(error3, author){
                var title = 'AUHOR';
                var filelist = template.list(topics);
                var html = template.html(title ,filelist ,
                    `
                    ${template.authorList(authors)}
                    
                    <style>
                    table{
                        border-collapse : collapse;
                    }
                        
                    td{
                        border:1px solid black;
                    }
                    </style>
                    <form action ="/author/update_process" method ="post">
                        <p>
                            <input type ="hidden" name ="id" value ="${queryData.id}">
                        </p>
                        <p>
                            <input type = "text" name ="name" placeholder = "name" value = "${author[0].name}">
                        </p>
                        <p>
                            <textarea name="profile" rows="5" cols="22" placeholder="description">${author[0].profile}</textarea>
                        </p>
                        <p>
                            <input type = "submit" value = "update"> 
                        </p>
                    </form>
                    `,
                    ``
                    );
            
                response.writeHead(200);
                response.end(html);

            });
        });
    });
}
exports.update_process  = function(request,response){
    var body = "";
    request.on("data", function(data){
      body = body + data;
 
    });
    request.on("end",function(){
      var post = qs.parse(body);
 
      connection.query(`
      UPDATE author SET name =? , profile = ? WHERE id =? `,
        [post.name, post.profile ,post.id],function(error,result){
          if(error){
           throw error;
          }
          response.writeHead(302,{Location:`/author`});
          response.end();
        })
    });
}

exports.delete_process = function(request, response){
    var body = "";
    request.on("data", function(data){
      body = body + data;
  
    });
    request.on("end",function(){
      var post = qs.parse(body);
      var id = post.id;
      // var filteredId  = path.parse(id).base;
      connection.query(`DELETE FROM topic WHERE author_id =?`,[id], function(error1,result1){
          if(error1){
            throw error1;
          }
          connection.query(`DELETE FROM author WHERE id =?`,[id],function(error2,result2){
            if(error2){
              throw error2;
            }
            response.writeHead(302,{Location:`/author`});
            response.end();
          });
        });
    });
  
}
