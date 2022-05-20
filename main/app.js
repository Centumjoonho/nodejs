var express = require('express');
// 가져온 모듈은 원래 함수
var app =express();

//미들웨어 ? 
app.use(express.static('public')); // public의 위치가 잘못 된거 같다
//request : 요청 res : 응답
app.get('/',function(request,respose){
    respose.send('Hello home page')
});
app.get('/login',function(request,respose){
    respose.send('<h1>PLZ Login</h1>')
});


app.listen(3000,function(){
    console.log('Connected 3000 port!');
});

