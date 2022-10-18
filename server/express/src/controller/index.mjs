import ejs from 'ejs';
export function main(req, res) {
  //   res.send('Birds home page');
  //   res.send('<h1>hello<input></h1>');
  res.render('index', {
    tempVar: 'tempVar',
    currentDate: new Date().toLocaleString(),
  });
}
export function myTemplate(req, res) {
  let template = '<html><body><h1>${data}</h1><h2>${name}</h2></body></html>';
  let data = {
    data: 'haha',
    name: 'name',
  };
  // 替换 ${} 中的内容
  template = template.replace(/\$\{[^}]+\}/g, str => {
    str = str.replace(/[${}]/g, ''); // 去除括号
    return new Function(...Object.keys(data), 'return ' + str)(...Object.values(data));
  });
  res.send(template);
}

export function ejsTemplate(req, res) {
  let template = `
  <html>
    <body>
        <h1><%=title%></h1>
        <ul>
            <% for(let i=0;i<10;i++){ %>
                <li>项<%=i%></li>
            <% } %>    
        </ul>
    </body>
  </html>`;
  let map = {
    title: '标题',
  };
  let html = ejs.render(template, map);
  res.send(html);
}
