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

export default router;
