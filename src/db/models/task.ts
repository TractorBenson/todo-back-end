import db from '../index';

export interface Task {
  id?: number;
  user_id: number;
  title: string;
  description?: string;
  due_date?: string;
  completed?: number;
  created_at?: string;
}

export const createTask = (task: Omit<Task, 'id' | 'created_at'>): Task => {
  const createdAt = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO tasks (user_id, title, description, due_date, completed, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    task.user_id,
    task.title,
    task.description ?? null,
    task.due_date ?? null,
    task.completed ?? 0,
    createdAt
  );

  return {
    ...task,
    id: Number(result.lastInsertRowid),
    created_at: createdAt,
  };
};

export const getTaskById = (id: number): Task | undefined => {
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id) as Task | undefined;
};

/**
 * 获取指定用户的任务列表，可按完成状态筛选，并支持分页。
 *
 * @param userId - 要获取任务的用户ID
 * @param options - 可选筛选条件：
 *   - completed: 只获取已完成(true)或未完成(false)的任务
 *   - limit: 限制返回的任务数量（分页）
 *   - offset: 跳过前面的任务数量（分页）
 * @returns 满足条件的任务数组
 */
export const getTasksByUserId = (
  userId: number,
  options: { completed?: boolean; limit?: number; offset?: number } = {}
): Task[] => {
  let query = 'SELECT * FROM tasks WHERE user_id = ?';
  const params: any[] = [userId];

  if (typeof options.completed === 'boolean') {
    query += ' AND completed = ?';
    params.push(options.completed ? 1 : 0);
  }

  query += ' ORDER BY due_date ASC';

  if (typeof options.limit === 'number') {
    query += ' LIMIT ?';
    params.push(options.limit);
  }

  if (typeof options.offset === 'number') {
    query += ' OFFSET ?';
    params.push(options.offset);
  }

  const stmt = db.prepare(query);
  return stmt.all(...params) as Task[];
};

export function getAllTasks(): Task[] {
  const stmt = db.prepare('SELECT * FROM tasks ORDER BY due_date ASC');
  return stmt.all() as Task[];
}

export const deleteTask = (id: number): void => {
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
};

export const updateTask = (
  id: number,
  updates: Partial<Omit<Task, 'id' | 'created_at'>>
): Task | undefined => {
  const allowedFields = ['user_id', 'title', 'description', 'due_date', 'completed'] as const;
  const setClauses: string[] = [];
  const values: any[] = [];

  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      setClauses.push(`${field} = ?`);
      values.push(updates[field]);
    }
  }

  if (setClauses.length === 0) return getTaskById(id); // nothing to update

  const query = `UPDATE tasks SET ${setClauses.join(', ')} WHERE id = ?`;
  values.push(id);

  db.prepare(query).run(...values);

  return getTaskById(id);
};