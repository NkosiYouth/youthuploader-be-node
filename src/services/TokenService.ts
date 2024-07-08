// src/services/TokenService.ts

import jwt from "jsonwebtoken";
import { AuthDocument } from "../types";

export default class TokenService {
  private static readonly accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET || "defaultAccessTokenSecret";
  private static readonly refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET || "defaultRefreshTokenSecret";
  private static readonly accessTokenExpiry: string = process.env.ACCESS_TOKEN_EXPIRY || "1h";
  private static readonly refreshTokenExpiry: string = process.env.REFRESH_TOKEN_EXPIRY || "7d";

  static generateAccessToken(user: AuthDocument): string {
    return jwt.sign({ userId: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }, this.accessTokenSecret, { expiresIn: this.accessTokenExpiry });
  }

  static generateRefreshToken(user: AuthDocument): string {
    return jwt.sign({ userId: user._id }, this.refreshTokenSecret, { expiresIn: this.refreshTokenExpiry });
  }

  static verifyAccessToken(token: string): any {
    return jwt.verify(token, this.accessTokenSecret);
  }

  static verifyRefreshToken(token: string): any {
    return jwt.verify(token, this.refreshTokenSecret);
  }
}
