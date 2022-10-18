import express from 'express';
import { main, myTemplate, ejsTemplate } from '../controller/index.mjs';
let router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', new Date().toLocaleString());
  next();
});

router.get('/', main);
router.get('/myTemplate', myTemplate);
router.get('/ejsTemplate', ejsTemplate);

export default router;
