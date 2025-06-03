// src/controllers/taskController.ts
import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';

export class TaskController {
  static createTask(req: Request, res: Response): void {
    const { user_id, title, due_date, description } = req.body;
    try {
      const task = TaskService.createTask(user_id, title, due_date, description);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: 'Invalid task data.' });
    }
  }

  static getTask(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const task = TaskService.getTask(id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found.' });
    }
  }

  static getTasksByUser(req: Request, res: Response): void {
    const userId = Number(req.params.userId);
    const { completed, limit, offset } = req.query;
    const tasks = TaskService.getTasksByUserId(userId, {
      completed: completed === 'true',
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
    res.json(tasks);
  }

  static deleteTask(req: Request, res: Response): void {
    const id = Number(req.params.id);
    TaskService.deleteTask(id);
    res.status(204).send();
  }

  static updateTask(req: Request, res: Response): void {
    const id = Number(req.params.id);
    const { title, due_date, description } = req.body;
    try {
      const task = TaskService.updateTask(id, { title, due_date, description });
      res.json(task);
    } catch (err) {
      res.status(400).json({ error: 'Failed to update task.' });
    }
  }

  static toggleTaskCompletion(req: Request, res: Response): void {
    const id = Number(req.params.id);
    try {
      const task = TaskService.toggleTaskCompletion(id);
      res.json(task);
    } catch (err) {
      res.status(400).json({ error: 'Failed to toggle task completion.' });
    }
  }
}