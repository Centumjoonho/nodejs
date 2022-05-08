// function a(){
//   console.log('A');
// }
//자바스크립트에서는 함수가 값이다!
var b = function(){
  console.log('a');
}


function slowfun(callback){
  callback();
}

slowfun(b);
