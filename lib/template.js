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

      ${filelist}

      ${control}

      ${body}

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

  }
}
