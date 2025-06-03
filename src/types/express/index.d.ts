// src/types/express/index.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; username?: string };  // 根据你的 user 对象结构来改
    }
  }
}
