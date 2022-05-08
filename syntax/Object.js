var members =['egoing', 'k8805', 'hoya'];
console.log(members[1]);

var roles ={
  'programmer' : 'egoing',
  'designer' : 'k8805',
  'manager' : 'hoya'
};

console.log(roles.programmer);

for (var i = 0; i < members.length; i++) {
  console.log(i+1);


  console.log(members[i]);
}

for(var name in roles){
  console.log("Object : " + name , "value : " + roles[name]);
}
