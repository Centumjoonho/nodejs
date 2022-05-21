// 함수 캡슐화 진행시 !! 필요한 모듈 항상 확인 
var connection = require('./db');
var template = require('./template.js');
var http = require('http');
var url = require('url'); // 모듈 (node.js)
var qs = require('querystring');
const { findSourceMap } = require('module');
var common = require('./common');
//api 여러개 제공할 때는 exports / 1개 단일 제공시 module.exports 
// var underscore = require('underscore');




exports.home = function(request,response){
    connection.query(`SELECT * FROM runners`, function(error, runners){
        

        var title = 'runners';
        // var filelist = template.list(topics);
        var html = template.html(title ,`<div><br></br></div>`,
            `
            ${template.runnersList(runners)}
            
            <style>
            table{
                border-collapse : collapse;
            }
                
            td{
                border:1px solid black;
            }
            </style>
            <form action ="/runners/create_process" method ="post">
                <p>
                    <input type = "text" name ="name" id = "name"placeholder = "이름">
                </p>
                <p>
                    <input type = "text" name ="km" id = "km" placeholder = "키로미터">
                </p>
                <p>
                    <input type = "text" name ="avpace" id = "avpace" placeholder = "평균페이스">
                </p>
                <p>
                    <input type = "text" name ="totaltime" id = "totaltime" placeholder = "시간">
                </p>
                <p>
                    <input type = "text" name ="avheartrate" id = "avheartrate" placeholder = "평균심박수">
                </p>
                <p>
                    <input type = "text" name ="avcadence" id = "avcadence" placeholder = "평균케이던스">
                </p>
                <p>
                    <input type = "submit" value = "create" id = "create"> 
                </p>
            </form>
            `,
            ``
            );
    
        response.writeHead(200);
        response.end(html);
        });
         
}
exports.create_process  = function(request,response){
    var body = "";
    request.on("data", function(data){
      body = body + data;
      
    });
    request.on("end",function(){
      var post = qs.parse(body);

 
      connection.query(`
      INSERT INTO runners (name, km, avpace, totaltime, avheartrate, avcadence) 
        VALUES( ? , ? , ? , ? , ? ,?)`,
        [post.name,post.km,post.avpace,post.totaltime,post.avheartrate,post.avcadence],function(error,result){
          if(error){
           throw error;
          }
          response.writeHead(302,{Location:`/runners`});
          response.end();
        })
    });
}

exports.update = function(request,response){
    connection.query(`SELECT * FROM runners`, function(error, runners){
        
            var _url = request.url;
            var queryData = url.parse(_url, true).query;
            connection.query(`SELECT * FROM runners WHERE id=?`,[queryData.id] ,function(error3, runners2){
                var title = 'RUNNERS';
                // var filelist = template.list(topics);
                var html = template.html(title ,"",
                    `
                    ${template.runnersList(runners2)}
                    
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
                        <input type = "text" name ="name" id = "name" value =${runners2[0].name}>
                    </p>
                    <p>
                        <input type = "text" name ="km" id = "km" value =${runners2[0].km}>
                    </p>
                    <p>
                        <input type = "text" name ="avpace" id = "avpace" value =${runners2[0].avpace}>
                    </p>
                    <p>
                        <input type = "text" name ="totaltime" id = "totaltime" value =${runners2[0].totaltime}>
                    </p>
                    <p>
                        <input type = "text" name ="avheartrate" id = "avheartrate" value =${runners2[0].avheartrate}>
                    </p>
                    <p>
                        <input type = "text" name ="avcadence" id = "avcadence" value =${runners2[0].avcadence}>
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
    
}
exports.update_process  = function(request,response){
    var body = "";
    request.on("data", function(data){
      body = body + data;
 
    });
    request.on("end",function(){
      var post = qs.parse(body);
 
      connection.query(`
      UPDATE runners SET name =? , avpace = ? , totaltime = ? , avheartrate = ? , avcadence = ? WHERE id = ? `,
        [post.name, post.avpace, post.totaltime, post.avheartrate, post.avcadence, post.id],function(error,result){
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
        connection.query(`DELETE FROM runners WHERE id =?`,[id],function(error2,result2){
            if(error2){
              throw error2;
            }
            response.writeHead(302,{Location:`/runners`});
            response.end();
          });
        });
    
  
}
