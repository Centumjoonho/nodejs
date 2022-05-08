// array , objects

var f = function b(){
  console.log(1+1);
  console.log(1+2);
}

// 자바스크립트에서는 함수가 값 !!

var a = [f];
a[0]();
/// 신기하네 !!  ->
var o = {
  func: f
}
o.func();
