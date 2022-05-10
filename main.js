
//Node.js import -> 크롬의v8엔진을 외부에서도 사용할 수 있게 runtime 프로그램
var http = require('http');
var url = require('url'); 
var qs = require('querystring');
var template = require('./lib/template.js');
const { log } = require('console');
var connection = require('./lib/db');
var topic = require('./lib/topic');
const { authorSelect } = require('./lib/template.js');
var author = require('./lib/author');

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
        topic.home(request, response);
      }else{
        topic.page(request,response);
      }
   //create 버튼 클릭 !! ->
 }else if (pathname=="/create") {

  topic.create(request,response);
   
//post 방식 데이터 받는 /create_process
 }else if (pathname == "/create_process") {

  topic.create_process(request,response);

 }else if (pathname=="/update") {
   
  topic.update(request,response);

}else if (pathname=="/update_process") {

 topic.update_process(request,response);

}else if (pathname=="/delete_process") {

 topic.delete_process(request,response);

}else if (pathname=="/author") {

 author.home(request,response);
 
}
else if (pathname=="/author/create_process") {

  author.create_process(request,response);
  
 }else if (pathname=="/author/update") {

  author.update(request,response);
  
 }else if (pathname=="/author/update_process") {

  author.update_process(request,response);
  
 }
 else if (pathname=="/author/delete_process") {

  author.delete_process(request,response);
  
 }else{
    
  response.writeHead(404); //web server <-> web browser
    //서로 정보를 잘 주고 받았는지
    response.end('Not Found');
  }

});

app.listen(3000);
