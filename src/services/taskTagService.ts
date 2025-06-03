// src/services/taskTagService.ts
import * as TaskTagModel from '../db/models/taskTag';
import { Tag } from '../db/models/tag';

export class TaskTagService {
  static addTagToTask(task_id: number, tag_id: number): void {
    TaskTagModel.addTagToTask(task_id, tag_id);
  }

  static removeTagFromTask(task_id: number, tag_id: number): void {
    TaskTagModel.removeTagFromTask(task_id, tag_id);
  }

  static getTagsForTask(task_id: number): string[] {
    return TaskTagModel.getTagsForTask(task_id);
  }
}