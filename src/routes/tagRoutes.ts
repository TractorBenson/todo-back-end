import { Router } from 'express';
import {
  createTag,
  getTag,
  getAllTags,
  deleteTag,
  updateTagColor,
} from '../controllers/tagController';

const router = Router();

router.post('/createTag', createTag);
router.post('/getTagById', getTag);
router.post('/getAllTags', getAllTags);
router.post('/deleteTag', deleteTag);
router.post('/updateTagColor', updateTagColor);

export default router;
