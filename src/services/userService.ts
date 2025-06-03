// src/services/userService.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user';
import * as UserModel from '../db/models/user';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'; // 真实项目中使用环境变量

export class UserService {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  static async register(username: string, email: string, password: string): Promise<User> {
    const existing = UserModel.getUserByEmail(email);
    if (existing) {
      throw new Error('Email already registered');
    }
    const password_hash = await this.hashPassword(password);
    return UserModel.createUser({ username, email, password_hash });
  }

  static async login(email: string, password: string) {
    const user = UserModel.getUserByEmail(email);
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) throw new Error('Invalid password');

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    return token;
  }

  static getUserById(id: number) {
    return UserModel.getUserById(id);
  }

  static removeUser(id: number): void {
    UserModel.deleteUser(id);
  }

  static async updateUsername(id: number, newUsername: string): Promise<User> {
    const user = UserModel.getUserById(id);
    if (!user) throw new Error('User not found');
    return UserModel.updateUser(id, { username: newUsername }) as User;
  }

  static async updatePassword(id: number, currentPassword: string, newPassword: string): Promise<User> {
    const user = UserModel.getUserById(id);
    if (!user) throw new Error('User not found');
    const valid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!valid) throw new Error('Current password is incorrect');
    const password_hash = await this.hashPassword(newPassword);
    return UserModel.updateUser(id, { password_hash }) as User;
  }
}