import db from '../index';

export interface User {
  id?: number;
  username: string;
  email: string;
  password_hash: string;
  created_at?: string;
}

export const createUser = (user: Omit<User, 'id' | 'created_at'>): User => {
  const stmt = db.prepare(`
    INSERT INTO users (username, email, password_hash, created_at)
    VALUES (?, ?, ?, ?)
  `);
  const now = new Date().toISOString();
  const result = stmt.run(user.username, user.email, user.password_hash, now);
  return { ...user, id: Number(result.lastInsertRowid), created_at: now };
};

export const getUserById = (id: number): User | undefined => {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | undefined;
};

export const getUserByEmail = (email: string): User | undefined => {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
};

export const updateUser = (id: number, updates: Partial<Omit<User, 'id' | 'created_at'>>): User | undefined => {
  const fields = Object.keys(updates);
  if (fields.length === 0) return getUserById(id);

  const assignments = fields.map((key) => `${key} = ?`).join(', ');
  const values = fields.map((key) => (updates as any)[key]);

  const stmt = db.prepare(`UPDATE users SET ${assignments} WHERE id = ?`);
  stmt.run(...values, id);

  return getUserById(id);
};

export const deleteUser = (id: number): void => {
  db.prepare('DELETE FROM users WHERE id = ?').run(id);
};
