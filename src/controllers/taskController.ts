// src/controllers/taskController.ts
import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';

export class TaskController {
  static async createTask(req: Request, res: Response): Promise<void> {
    const { user_id, title, due_date, description } = req.body;
    try {
      const task = await TaskService.createTask(user_id, title, due_date, description);
      res.status(201).json(task);
    } catch (err: any) {
      res.status(400).json({ error: err.message || 'Invalid task data.' });
    }
  }

  static async getTask(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const task = await TaskService.getTask(id);
      res.json(task);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Task not found.' });
    }
  }

  static async getTasksByUser(req: Request, res: Response): Promise<void> {
    const userId = Number(req.params.userId);
    const { completed, limit, offset } = req.query;
    try {
      const tasks = await TaskService.getTasksByUserId(userId, {
        completed: completed === 'true',
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
      });
      res.json(tasks);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to fetch tasks.' });
    }
  }

  static async deleteTask(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      await TaskService.deleteTask(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Task not found.' });
    }
  }

  static async updateTask(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { title, due_date, description } = req.body;
    try {
      const task = await TaskService.updateTask(id, { title, due_date, description });
      res.json(task);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Failed to update task.' });
    }
  }

  static async toggleTaskCompletion(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const task = await TaskService.toggleTaskCompletion(id);
      res.json(task);
    } catch (err: any) {
      res.status(404).json({ error: err.message || 'Failed to toggle task completion.' });
    }
  }
}