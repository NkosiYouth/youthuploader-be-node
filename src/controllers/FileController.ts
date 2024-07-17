
import { Request, Response } from "express";
import { AuthService } from "../services";
import BaseController from "./BaseController";
import { File, HttpStatus } from "../types";
import { createAuthUserSchema, createMagicLinkSchema, tokenSchema } from "../validators";
import { uploadFile } from "../utils/s3";

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
            const uploadPromises = files.map((file) => {
                const fileData: File = {
                    path: file.path,
                    filename: file.filename,
                    mimetype: file.mimetype,
                    originalname: file.originalname,
                    size: file.size,
                };
                // return uploadFile(fileData);
                return fileData;
            });
            const results = await Promise.all(uploadPromises);
            this.sendResponse(res, HttpStatus.OK,{
                files: results
            });
        } catch (error) {
            this.sendError(res, error);
        }
    }
}

export default new FileController();
