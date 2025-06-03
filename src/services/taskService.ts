// src/services/taskService.ts
import * as TaskModel from '../db/models/task';
import { Task } from '../db/models/task';

export class TaskService {
  static createTask(user_id: number, title: string, due_date?: string, description?: string): Task {
    return TaskModel.createTask({ user_id, title, due_date, description });
  }

  static getTask(id: number): Task | undefined {
    return TaskModel.getTaskById(id);
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
    TaskModel.deleteTask(id);
  }

  static updateTask(id: number, updates: Partial<Omit<Task, 'id' | 'created_at'>>): Task | undefined {
    return TaskModel.updateTask(id, updates);
  }

  static toggleTaskCompletion(id: number): Task | undefined {
    const task = TaskModel.getTaskById(id);
    if (!task) return undefined;

    const updatedTask = { ...task, completed: !task.completed };
    return TaskModel.updateTask(id, {
      completed: updatedTask.completed ? 1 : 0,
    });
  }
}