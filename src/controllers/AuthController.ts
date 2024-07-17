
import { Request, Response } from "express";
import { AuthService } from "../services";
import BaseController from "./BaseController";
import { HttpStatus } from "../types";
import { createAuthUserSchema, createMagicLinkSchema, tokenSchema } from "../validators";

class AuthController extends BaseController {

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = await createAuthUserSchema.validateAsync(req.body);
      const newUser = await AuthService.createAuthUser(validatedData);
      this.sendResponse(res, HttpStatus.CREATED, newUser);
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  async requestMagicLogin(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = await createMagicLinkSchema.validateAsync(req.body);
      const user = await AuthService.checkAuthUserExistsByEmail(validatedData.email);
      if (user) {
        await AuthService.generateMagicLink(validatedData.email);
        this.sendResponse(res, HttpStatus.OK, 'Magic Link sent!');
      } else {
        this.sendError(res, undefined, {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Auth User does not exists!'
        });
      }
    } catch (error: any) {
      this.sendError(res, error);
    }
  }

  async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = await tokenSchema.validateAsync(req.query);
      const user = await AuthService.verifyToken(validatedData.token);
      if (!user) {
        return this.sendError(res, undefined, {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: "Invalid or expired token"
        });
      }
      this.sendResponse(res, HttpStatus.OK, user);
    } catch (error: any) {
      this.sendError(res, HttpStatus.BAD_REQUEST, error.message);
    }
  }
}

export default new AuthController();
