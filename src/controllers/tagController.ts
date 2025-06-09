import { Request, Response } from 'express';
import { TagService } from '../services/tagService';

export const createTag = (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;
    const tag = TagService.createTag(name, color);
    res.status(201).json(tag);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTag = (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const tag = TagService.getTag(id);
    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.json(tag);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTags = (_req: Request, res: Response) => {
  try {
    const tags = TagService.getAllTags();
    res.json(tags);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTag = (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    TagService.deleteTag(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTagColor = (req: Request, res: Response) => {
  const { id, color } = req.body;
  try {
    TagService.updateTagColor(id, color);
    res.status(200).json({ message: 'Tag color updated' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};