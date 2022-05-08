var M = {
  v : 'v',
  f : function(){
    console.log(this.v);
  }
}

var N = {
  d:'d',
  A:function(){
    console.log(this.d);
  }
}

module.exports =[M , N];
