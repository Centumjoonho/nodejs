
//Node.js import -> 크롬의v8엔진을 외부에서도 사용할 수 있게 runtime 프로그램
var http = require('http');
var fs = require('fs');
var url = require('url'); // 모듈 (node.js)
var qs = require('querystring');
// 웹화면 기본 html , list 함수 module
var template = require('./lib/template.js');
var path = require("path");
var sanitizeHTML = require("sanitize-html");
var mysql = require('mysql');
const { log } = require('console');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'wnsgh774',
  database : 'nodejs_jooncoding'
});

connection.connect();


// 웹 서버 생성
var app = http.createServer(function(request,response){
    var _url = request.url;
    // ?id = CSS
    var queryData = url.parse(_url, true).query;
    //data/css.js
    var pathname = url.parse(_url, true).pathname;
    //console.log(pathname);

    //경로 및 id 값이 없는 기본 웹페이지 상태
    if (pathname == '/') {
      //id 값이 없는 경우 리드 !!
      if (queryData.id== undefined) {
        //경로를 읽는 노드js 함수
        //콜백함수 -> 하나의 인자 ! 주변 인자와 연관 되어 있음!
        // fs.readdir('./data', function(error, dir_filelist){
        //   //home
        //   var title = 'Welcome';
        //   var description = '안녕하세요. 종주 중독 홈페이지입니다.';

        //   var filelist = template.list(dir_filelist);
        //   //filelist => return data_list;
        //   //readdir -> templateList -> templateHTML
        //   var html = template.html(
        //     title ,
        //     filelist ,
        //   `<h2>${title}</h2>${description}`,
        //   `<a href="/create">create</a>`);
        //   //웹 서버와 수신이 잘 되면 : 200
        //   response.writeHead(200);
        //   //웹 화면에 업로
        //   response.end(html);
        // });
        //db 화 !! 
        connection.query(`SELECT * FROM topic`, function(error, topics){
         
          var title = 'Welcome';
          var description = '안녕하세요. 종주 중독 홈페이지입니다.';

          var filelist = template.list(topics);
          var html = template.html(title ,filelist ,
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a>`);

          response.writeHead(200);
          response.end(html);
        });
      }else{
        // //컨텐츠를 선택했을 때 활성
        // // id 값이 있는 경우 리드 !!
        // fs.readdir('./data', function(error, dir_filelist){
        //   var filteredId = path.parse(queryData.id).base;
        //   //id 값이 있는경우는 해당 파일 내용을 읽어내는 node.js 함
        //   fs.readFile(`data/${filteredId}`,'utf-8',function(err,description){
        //     var title = queryData.id
        //     var sanitizedTitle =sanitizeHTML(title);
        //     var sanitizedDescription = sanitizeHTML(description,{allowedTags:['h1']});
        //     var filelist = template.list(dir_filelist)
        //     var html = template.html(
        //       title ,
        //       filelist ,
        //       `<h2>${title}</h2>${sanitizedDescription}`,
        //       `<a href="/create">create</a>
        //        <a href="/update?id=${sanitizedTitle}">update</a>
        //        <form action = "delete_process" method ="post">
        //         <input type ="hidden" name = "id" value = "${title}">
        //         <input type ="submit" value ="delete">
        //         <div>
        //           <progress value = "80" min ="0" max="100"></progress>
        //         </div>
        //         <div>
        //           <meter min = "0" max="100" low ="20" hight="65" optimum ="15" value = "100"></meter>
        //         </div>
        //        </form>`
        //      );

               //query가 보이는 것은 get방식
        connection.query(`SELECT * FROM topic`, function(error, topics){
          if(error){
            throw error;
          }
          connection.query(`SELECT * FROM topic WHERE id =?`,[queryData.id], function(error2,topic){
            if(error2){
              throw error2;
            }
            //console.log(topic[0].title);
            var title = topic[0].title;
            var description = topic[0].description;

            var filelist = template.list(topics);
            var html = template.html(title ,filelist ,
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a>
                <a href="/update?id=${queryData.id}">update</a>
                <form action = "delete_process" method ="post">
                 <input type ="hidden" name = "id" value = "${queryData.id}">
                 <input type ="submit" value ="delete">
                 <div>
                   <progress value = "80" min ="0" max="100"></progress>
                 </div>
                 <div>
                   <meter min = "0" max="100" low ="20" hight="65" optimum ="15" value = "100"></meter>
                 </div>
                </form>`);

            response.writeHead(200);
            response.end(html);
          })
         
          
        });
          
      //   });
      // });
   }
   //create 버튼 클릭 !! ->
 }else if (pathname=="/create") {

   connection.query(`SELECT * FROM topic`, function(error, topics){
    if(error){
      throw error;
     }    
    var title = 'CREATE';

    var filelist = template.list(topics);
    var html = template.html(title ,filelist ,
        `<form class="" action="/create_process" method ="post">
        <p><input type="text" name="title" value="" placeholder ="title"></p>
        <p>
          <textarea name="description" rows="8" cols="22" placeholder="description"></textarea>
        </p>
        <p>
        <input type="submit">
      </p>
      </form>
 `,'');

    response.writeHead(200);
    response.end(html);
  });
   
//post 방식 데이터 받는 /create_process
 }else if (pathname == "/create_process") {
   var body = "";
   request.on("data", function(data){
     body = body + data;

   });
   request.on("end",function(){
     var post = qs.parse(body);
    //  var title= post.title;
    //  var description = post.description;

    //  fs.writeFile(`data/${title}`,description,"utf-8",
    //  function(err){
    //    // 302는 페이지 리다이렉
    //    // -> 보낸 데이터 값을 다시 페이지에 리 다이렉
    //    response.writeHead(302,{Location:`/?id=${title}`});
    //    response.end("success");
    //  })
     connection.query(`
     INSERT INTO topic (title, description, created, author_id) 
       VALUES( ? , ? , Now() , ? )`,
       [post.title,post.description,1],function(error,result){
         if(error){
          throw error;
         }
         response.writeHead(302,{Location:`/?id=${result.insertId}`});
         response.end();
       })
   });

 }else if (pathname=="/update") {
   connection.query(`SELECT * FROM topic`,function(error,topics){
     if(error){throw error;}
     connection.query(`SELECT * FROM topic WHERE id =?`,[queryData.id],function(error2 ,topic){
      if(error2){throw error;}

       var id =topic[0].id;
       var title = topic[0].title;
       var description = topic[0].description;
       var filelist = template.list(topics)

       var html = template.html(title , filelist ,
         //데이터 입력 form
         `<form class="" action="/update_process" method ="post">
         <input type ="hidden" name ="id" , value = "${id}">
            <p><input type="text" name="title" placeholder ="title" value="${title}"></p>
            <p>
              <textarea name="description" rows="8" cols="22" placeholder="description" >${description}</textarea>
            </p>
            <p>
            <input type="submit">
          </p>
          </form>`,
         `<a href="/create">create</a> <a href="/update?id=${id}">update</a>`)
  
       response.writeHead(200);
       response.end(html);
  
    });
   });
  

//    fs.readdir('./data', function(error, filelist){
//      var filteredId = path.parse(queryData.id).base;
//      fs.readFile(`data/${filteredId}`,'utf-8',function(err,description){
//        var title = queryData.id
//        var list = template.list(filelist)
//        var html = template.html(title , list ,

//          //데이터 입력 form
//          `<form class="" action="/update_process" method ="post">
//          <input type ="hidden" name ="id" , value = "${title}">
//             <p><input type="text" name="title" placeholder ="title" value="${title}"></p>
//             <p>
//               <textarea name="description" rows="8" cols="22" placeholder="description" >${description}</textarea>
//             </p>
//             <p>
//             <input type="submit">
//           </p>
//           </form>`,
//          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`)

//        response.writeHead(200);
//        response.end(html);
//    });
//  });
}else if (pathname=="/update_process") {
  var body = "";
  request.on("data", function(data){
    body = body + data;

  });
  request.on("end",function(){
    
    var post = qs.parse(body);
    var id = post.id;
    var title= post.title;
    var description = post.description;


    // fs.rename(`data/${id}`,`data/${title}`,function(error){
    //   fs.writeFile(`data/${title}`,description,"utf-8",
    //   function(err){
    //     // 302는 페이지 리다이렉
    //     // -> 보낸 데이터 값을 다시 페이지에 리 다이렉
    //     response.writeHead(302,{Location:`/?id=${title}`});
    //     response.end("success");
    //   });
    // });
    connection.query(`UPDATE topic SET title=?, description=? WHERE id =?`,[title, description, id], function(error,result){
      response.writeHead(302,{Location:`/?id=${id}`});
      response.end("success");
    });
  });

}else if (pathname=="/delete_process") {
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
    // fs.unlink(`data/${filteredId}`,function(error){
    //   response.writeHead(302,{Location:`/`});
    //   response.end();
    // });
    // console.log(post);
  });

}else{
    response.writeHead(404); //web server <-> web browser
    //서로 정보를 잘 주고 받았는지
    response.end('Not Found');
  }

});
app.listen(3000);
