// src/services/tagService.ts
import * as TagModel from '../db/models/tag';
import { Tag } from '../db/models/tag';

export class TagService {
  static createTag(name: string): Tag {
    return TagModel.createTag(name);
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
}