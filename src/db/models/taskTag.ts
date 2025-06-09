import db from '../index';
import { Tag } from './tag';

export const addTagToTask = (task_id: number, tag_id: number): void => {
  db.prepare('INSERT INTO task_tags (task_id, tag_id) VALUES (?, ?)').run(task_id, tag_id);
};

export const removeTagFromTask = (task_id: number, tag_id: number): void => {
  db.prepare('DELETE FROM task_tags WHERE task_id = ? AND tag_id = ?').run(task_id, tag_id);
};

export const getTagsForTask = (task_id: number): Tag[] => {
 const rows = db.prepare(`
  SELECT tags.id, tags.name, tags.color FROM tags
  INNER JOIN task_tags ON tags.id = task_tags.tag_id
  WHERE task_tags.task_id = ?
  `).all(task_id) as { id: number, name: string, color: string  }[];
  return rows;
};