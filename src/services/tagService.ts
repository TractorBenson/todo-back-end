// src/services/tagService.ts
import * as TagModel from '../db/models/tag';
import { Tag } from '../db/models/tag';

export class TagService {
  static createTag(name: string, color: string): Tag {
    return TagModel.createTag(name, color);
  }

  static getTag(id: number): Tag | undefined {
    return TagModel.getTagById(id);
  }

  static getAllTags(): Tag[] {
    return TagModel.getAllTags();
  }

  static deleteTag(id: number): void {
    TagModel.deleteTag(id);
  }

  static updateTagColor(id: number, color: string): void {
    TagModel.updateTagColor(id, color);
  }
}