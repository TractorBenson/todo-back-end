import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await UserService.register(username, email, password);
  res.json(user);
  return;
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await UserService.login(email, password);
  res.json({ token });
  return;
};

export const getCurrentUser = (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (typeof userId !== 'number') {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const user = UserService.getUserById(userId);
    res.json(user);
    return;
};

export const updateUsername = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { newUsername } = req.body;

  if (typeof userId !== 'number') {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const updatedUser = await UserService.updateUsername(userId, newUsername);
  res.json(updatedUser);
  return;
};

export const updatePassword = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { currentPassword, newPassword } = req.body;

  if (typeof userId !== 'number') {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    await UserService.updatePassword(userId, currentPassword, newPassword);
    res.json({ message: 'Password updated successfully.' });
    return;
  } catch (error: any) {
    res.status(400).json({ error: error.message });
    return;
  }
};

export const logout = (req: Request, res: Response) => {
  // 可以让前端清除 JWT，这里主要是提供语义明确的 endpoint
  res.json({ message: 'Logout successful' });
  return;
};