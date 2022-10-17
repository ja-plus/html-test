import express from 'express';
let router = express.Router();
router.use((req, res, next) => {
  console.log('Time: ', new Date().toLocaleString());
  next();
});

router.get('/', (req, res) => {
  //   res.send('Birds home page');
  //   res.send('<h1>hello<input></h1>');
  res.render('index', {
    tempVar: 'tempVar',
    currentDate: new Date().toLocaleString(),
  });
});
router.get('/myTemplate', (req, res) => {
  let template = '<html><body><h1>${data}</h1><h2>${name}</h2></body></html>';
  let data = {
    data: 'haha',
    name: 'name',
  };
  template = template.replace(/\$\{\w+\}/g, str => {
    str = str.replace(/[${}]/g, '');
    return new Function('return' + str);
  });
  res.send(template);
});

export default router;
