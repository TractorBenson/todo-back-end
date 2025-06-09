import { Request, Response } from "express"
import { TaskTagService } from "../services/taskTagService"

export class TaskTagController {
  static addTagToTask(req: Request, res: Response): void {
    const { task_id, tag_id } = req.body;
    try {
      TaskTagService.addTagToTask(task_id, tag_id);
      res.status(201).json({ message: "Tag added to task" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static removeTagFromTask(req: Request, res: Response): void {
    const { task_id, tag_id } = req.body;
    try {
      TaskTagService.removeTagFromTask(task_id, tag_id);
      res.status(200).json({ message: "Tag removed from task" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static getTagsForTask(req: Request, res: Response): void {
    const { task_id } = req.body;
    try {
      const tags = TaskTagService.getTagsForTask(task_id);
      res.status(200).json(tags);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}