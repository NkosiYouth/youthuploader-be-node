// src/middlewares/JWTVerify.ts

import { Request, Response, NextFunction } from "express";
import TokenService from "../services/TokenService";
import { DecodedToken } from "../types";

// Extend the Request interface to include a `user` property
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

function JWTVerify(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No authorization header provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = TokenService.verifyAccessToken(token);
    req.user = decodedToken; // Assuming you attach the user to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default JWTVerify;