
import { Request, Response } from "express";
import { AuthService } from "../services";
import BaseController from "./BaseController";
import { File, HttpStatus } from "../types";
import { createAuthUserSchema, createMagicLinkSchema, tokenSchema } from "../validators";
import { S3Helper } from "../utils";

class FileController extends BaseController {
    // Upload Files
    async create(req: Request, res: Response): Promise<void> {
        try {
            if (!req.files) {
                this.sendError(res, undefined, {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'No files uploaded.'
                })
            }
            const files = req.files as Express.Multer.File[];
            const uploadResults = await S3Helper.uploadMultipleFiles(files, 'pdf/');
            this.sendResponse(res, HttpStatus.OK,{
                files: uploadResults
            });
        } catch (error) {
            this.sendError(res, error);
        }
    }
}

export default new FileController();
