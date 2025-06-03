import db from '../index';

export interface Tag {
  id?: number;
  name: string;
}

export const createTag = (name: string): Tag => {
  const stmt = db.prepare('INSERT INTO tags (name) VALUES (?)');
  const result = stmt.run(name);
  return {
    id: Number(result.lastInsertRowid),
    name,
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