// src/services/taskService.ts
import * as TaskModel from '../db/models/task';
import { Task } from '../db/models/task';

export class TaskService {
  static createTask(user_id: number, title: string, due_date?: string, description?: string): Task {
    return TaskModel.createTask({ user_id, title, due_date, description });
  }

  static getTask(id: number): Task {
    const task = TaskModel.getTaskById(id);
    if (!task) throw new Error('Task not found');
    return task;
  }

  static getAllTasks(): Task[] {
    return TaskModel.getAllTasks();
  }

  static getTasksByUserId(
    userId: number,
    options: { completed?: boolean; limit?: number; offset?: number } = {}
  ): Task[] {
    return TaskModel.getTasksByUserId(userId, options);
  }

  static deleteTask(id: number): void {
    const task = TaskModel.getTaskById(id);
    if (!task) throw new Error('Task not found');
    TaskModel.deleteTask(id);
  }

  static updateTask(id: number, updates: Partial<Omit<Task, 'id' | 'created_at'>>): Task {
    const task = TaskModel.getTaskById(id);
    if (!task) throw new Error('Task not found');
    return TaskModel.updateTask(id, updates)!;
  }

  static toggleTaskCompletion(id: number): Task {
    const task = TaskModel.getTaskById(id);
    if (!task) throw new Error('Task not found');

    const newStatus = task.completed ? 0 : 1;
    return TaskModel.updateTask(id, { completed: newStatus })!;
  }
}