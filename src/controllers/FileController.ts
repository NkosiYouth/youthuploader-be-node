import { Request, Response } from "express";
import BaseController from "./BaseController";
import { File, HttpStatus } from "../types";
import { S3Helper, uniqifyFileName } from "../utils";
import { FileService } from "../services";

class FileController extends BaseController {
    // Upload Files
    async create(req: Request, res: Response): Promise<void> {
        try {
            // Check if files are uploaded
            if (!req.files || !(req.files instanceof Array)) {
                return this.sendError(res, undefined, {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'No files uploaded or invalid file format.'
                });
            }

            let files: File[] = req.files as Express.Multer.File[];

            files = files.map(file => ({
                ...uniqifyFileName(file)
            }));

            // Upload files to S3
            const uploadResults = await S3Helper.uploadMultipleFiles(files, 'pdf/');
            const filesPath = uploadResults.map(item => item.Key);

            console.log(req.user);
            const userId = req.user._id;
            // Create file records in the database
            const results = await FileService.createFiles(filesPath, userId);

            // Send successful response
            this.sendResponse(res, HttpStatus.OK, results);
        } catch (error) {
            // Handle errors
            this.sendError(res, error);
        }
    }
}

export default new FileController();
