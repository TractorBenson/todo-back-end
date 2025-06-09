import db from '../index';

export interface Tag {
  id?: number;
  name: string;
  color: string;
}

export const createTag = (name: string, color: string): Tag => {
  const stmt = db.prepare('INSERT INTO tags (name, color) VALUES (?, ?)');
  const result = stmt.run(name, color);
  return {
    id: Number(result.lastInsertRowid),
    name,
    color,
  };
};

export const getTagByName = (name: string): Tag | undefined => {
  return db.prepare('SELECT * FROM tags WHERE name = ?').get(name) as Tag | undefined;
};

export const deleteTag = (id: number): void => {
  db.prepare('DELETE FROM tags WHERE id = ?').run(id);
};

export const getTagById = (id: number): Tag | undefined => {
  return db.prepare('SELECT * FROM tags WHERE id = ?').get(id) as Tag | undefined;
};

export const getAllTags = (): Tag[] => {
  return db.prepare('SELECT * FROM tags').all() as Tag[];
};

export const updateTagColor = (id: number, color: string): void => {
  db.prepare('UPDATE tags SET color = ? WHERE id = ?').run(color, id);
};