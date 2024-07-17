import { NextFunction, Request, Response } from 'express';
import TokenService from '../services/TokenService';
import { toObjectId } from '../utils';

declare module 'express' {
  interface Request {
    user?: any;
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = TokenService.verifyAccessToken(token);
    decoded._id = toObjectId(decoded.userId);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default verifyToken;
