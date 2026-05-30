import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { User, UserRole } from '../models/User';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    
    if (user.role === UserRole.Admin) {
      return next(); // Admin can access all modules
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
};
