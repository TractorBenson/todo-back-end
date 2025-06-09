import { Router } from 'express';
import { TaskController } from '../controllers/taskController';

const router = Router();

router.post('/createTask', TaskController.createTask);
router.post('/getTaskById', TaskController.getTask);
router.post('/getTasksByUser', TaskController.getTasksByUser);
router.post('/deleteTask', TaskController.deleteTask);
router.post('/updateTask', TaskController.updateTask);
router.post('/toggleTaskCompletion', TaskController.toggleTaskCompletion);

export default router;
