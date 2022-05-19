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
         
    var title = 'Welcome';
    var description = '안녕하세요. 종주 중독 홈페이지입니다.';

    var filelist = template.list(topics);
    var html = template.html(title ,filelist ,
        `<h2>Welcome</h2>안녕하세요. 종주 중독 홈페이지입니다`,"");

    response.writeHead(200);
    response.end(html);
});

};

exports.page = function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;

    connection.query(`SELECT * FROM topic`, function(error, topics){
        if(error){
          throw error;
        }
        connection.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id =?`,[queryData.id], function(error2,topic){
          if(error2){
            throw error2;
          }
          // console.log(topic);
          var title = topic[0].title;
          var description = topic[0].description;
          var author_name = topic[0].name;

          var filelist = template.list(topics);
          var html = template.html(title ,filelist ,
            `<h2>${title}</h2>
            ${description}
            <p>by ${author_name}</p>
            `,
            `<a href="/create">create</a>
              <a href="/update?id=${queryData.id}">update</a>
              <form action = "delete_process" method ="post">
               <input type ="hidden" name = "id" value = "${queryData.id}">
               <input type ="submit" value ="delete">
              </form>`);

          response.writeHead(200);
          response.end(html);
        })
       
        
      });
}
exports.create = function(request,response){

    connection.query(`SELECT * FROM topic`, function(error, topics){
        connection.query(`SELECT * FROM author`,function(error2, authors){
         //console.log(authors);
         
         var title = 'CREATE';
     
         var filelist = template.list(topics);
         var html = template.html(title ,filelist ,
             `
             <form class="" action="/create_process" method ="post">
             <p><input type="text" name="title" value="" placeholder ="title"></p>
             <p>
               <textarea name="description" rows="8" cols="22" placeholder="description"></textarea>
             </p>
             <p>
               ${template.authorSelect(authors)}
             </p>
             <p>
             <input type="submit">
           </p>
           </form>
      `,'');
       response.writeHead(200);
       response.end(html);
   
        });
      });
}
exports.create_process =function(request,response){
    var body = "";
    request.on("data", function(data){
      body = body + data;
 
    });
    request.on("end",function(){
      var post = qs.parse(body);
 
      connection.query(`
      INSERT INTO topic (title, description, created, author_id) 
        VALUES( ? , ? , Now() , ? )`,
        [post.title,post.description,post.author],function(error,result){
          if(error){
           throw error;
          }
          response.writeHead(302,{Location:`/?id=${result.insertId}`});
          response.end();
        })
    });
}
exports.update = function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;

    connection.query(`SELECT * FROM topic`,function(error,topics){
        if(error){throw error;}
        connection.query(`SELECT * FROM topic WHERE id =?`,[queryData.id],function(error2 ,topic){
         if(error2){throw error;}
         connection.query(`SELECT * FROM author`,function(error2, authors){
          var id =topic[0].id;
          var title = topic[0].title;
          var description = topic[0].description;
          var filelist = template.list(topics)
          
          var html = template.html(title , filelist ,
            //데이터 입력 form
            `<form class="" action="/update_process" method ="post">
               <p><input type ="hidden" name ="id" , value = "${id}"></p>
               <p><input type="text" name="title" placeholder ="title" value="${title}"></p>
               <p>
                 <textarea name="description" rows="8" cols="22" placeholder="description" >${description}</textarea>
               </p>
               <p>
               ${template.authorSelect(authors , topic[0].author_id)}
               </p>
               <p>
               <input type="submit">
             </p>
             </form>`,
            `<a href="/create">create</a> <a href="/update?id=${id}">update</a>`);
         
         response.writeHead(200);
         response.end(html);
         
         });
       });
      });

}
exports.update_process = function(request, response){
    var body = "";
    request.on("data", function(data){
      body = body + data;
  
    });
    request.on("end",function(){
      
      var post = qs.parse(body);
      var id = post.id;
      var title= post.title;
      var description = post.description;
      var author = post.author
    
      connection.query(`UPDATE topic SET title=?, description=?, author_id =?  WHERE id =?`,[title, description, author, id], function(error,result){
        response.writeHead(302,{Location:`/?id=${id}`});
        response.end("success");
      });
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
  
      connection.query(`DELETE FROM topic WHERE id =?`,[id],function(error,result){
        if(error){
          throw error;
        }
        response.writeHead(302,{Location:`/`});
        response.end();
      });
    
    });
  
}