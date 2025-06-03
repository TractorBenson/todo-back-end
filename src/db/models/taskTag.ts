import db from '../index';

export const addTagToTask = (task_id: number, tag_id: number): void => {
  db.prepare('INSERT INTO task_tags (task_id, tag_id) VALUES (?, ?)').run(task_id, tag_id);
};

export const removeTagFromTask = (task_id: number, tag_id: number): void => {
  db.prepare('DELETE FROM task_tags WHERE task_id = ? AND tag_id = ?').run(task_id, tag_id);
};

export const getTagsForTask = (task_id: number): string[] => {
 const rows = db.prepare(`
  SELECT tags.name FROM tags
  INNER JOIN task_tags ON tags.id = task_tags.tag_id
  WHERE task_tags.task_id = ?
`).all(task_id) as { name: string }[];
return rows.map(row => row.name);
};