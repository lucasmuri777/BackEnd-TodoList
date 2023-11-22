import { Router } from 'express';

import * as TodoController from '../controllers/todoController';

const router = Router();

router.get('/todo', TodoController.getAll);
router.get('/todo/:title', TodoController.getByTitle);
router.post('/todo', TodoController.create);
router.put('/todo/:id', TodoController.update);
router.delete('/todo/:id', TodoController.deleteById);



export default router;