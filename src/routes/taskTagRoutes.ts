import { Router } from "express";
import { TaskTagController } from "../controllers/taskTagController";

const router = Router();

router.post('/addTagToTask', TaskTagController.addTagToTask);
router.post('/removeTagFromTask', TaskTagController.removeTagFromTask);
router.post('/getTagsForTask', TaskTagController.getTagsForTask);

export default router;