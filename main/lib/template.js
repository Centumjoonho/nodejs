module.exports = {
  html : function(title , filelist , body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB2 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
    
      <h1><a href="/">종주중독</a></h1>
      <br>
      <a href = "/author">회원</a>
      </br>
      <br>
      <a href = "/active">활동</a>
      </br>
      <br>
      <a href = "/topic">공지</a>
      </br>
      <br>
      <a href = "/runners">러너</a>
      </br>

      <br>
      ${filelist}
      </br>

      ${body}
      
      <br>
      ${control}
      </br>

      </p>
    </body>
    </html>
    `;
  },list : function(topics){
    //topics => 배열 변,
    var data_list = '<ul>';

    var i = 0;

    while (i < topics.length) {

      data_list = data_list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;

      i = i + 1;
    }
    data_list = data_list + '</ul>';
    return data_list;

  },authorSelect :function(authors, author_id){
    var tag='';
    var i =0;
    while(i < authors.length){
      var selected ='';
      if(authors[i].id === author_id){
        selected = 'selected';
      }
      tag += `<option value = "${authors[i].id}" ${selected} >${authors[i].name}</option>`;
      i ++;
    }
    return `
    <select name ="author">
     ${tag}
    </select>
    `
  },authorList : function(authors){
    var tag = '<table>';
    var i = 0;
    while(i<authors.length){
        
        tag += `
        <tr>
            <td>${authors[i].name}</td>
            <td>${authors[i].profile}</td>
            <td><a href = "/author/update?id=${authors[i].id}">update</td>
            <td>
              <form action = "/author/delete_process" method = "post">
                <input type = "hidden" name= "id" value = "${authors[i].id}">
                <input type = "submit" name = "delete" value="delete">
              </form>
            </td>
        </tr>
        `
        i++;
    }
    tag += '</table>';
    return tag;
  },runnersList : function(runners){
    var tag = '<table>';
    var i = 0;
    while(i<runners.length){
      
        
        tag += `
        <tr>
            <td>${runners[i].name}</td>
            <td>${runners[i].km}</td>
            <td>${runners[i].avpace}</td>
            <td>${runners[i].totaltime}</td>
            <td>${runners[i].avheartrate}</td>
            <td>${runners[i].avcadence}</td>
            <td><a href = "/runners/update?id=${runners[i].id}">update</td>
            <td>
              <form action = "/runners/delete_process" method = "post">
                <input type = "hidden" name= "id" value = "${runners[i].id}">
                <input type = "submit" name = "delete" value="delete">
              </form>
            </td>
        </tr>
        `
        i++;
    }
    tag += '</table>';
    return tag;
  }
}
