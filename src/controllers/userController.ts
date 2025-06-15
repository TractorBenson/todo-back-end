import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await UserService.register(username, email, password);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.login(email, password);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const getCurrentUser = (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (typeof userId !== 'number') {
    console.log(userId);
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const user = UserService.getUserById(userId);
  res.json(user);
};

export const updateUsername = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { newUsername } = req.body;

  if (typeof userId !== 'number') {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const updatedUser = await UserService.updateUsername(userId, newUsername);
    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
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
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.json({ message: 'Logout successful' });
};