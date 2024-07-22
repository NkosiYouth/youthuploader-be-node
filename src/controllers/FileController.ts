import { Request, Response } from "express";
import BaseController from "./BaseController";
import { File, FileDocument, FileMetaData, HttpStatus } from "../types";
import { S3Helper, uniqifyFileName } from "../utils";
import { FileService } from "../services";
import { deleteFileSchema, uploadFilesSchema } from "../validators";

class FileController extends BaseController {

    async index(_req: Request, res: Response): Promise<void> {
        try {
            let filesData: FileDocument[] = await FileService.getAllFiles();
            this.sendResponse(res, HttpStatus.OK, filesData);
        } catch (error) {
            this.sendError(res, error);
        }
    }
    // Upload Files
    async upload(req: Request, res: Response): Promise<void> {
        try {
            const { error } = uploadFilesSchema.validate(req.body, { abortEarly: false });
            if (error) {
                this.sendError(res, undefined, {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: error.details.map(detail => detail.message).join(', ')
                });
                return;
            }
            // Check if files are uploaded
            if (!req.files || !(req.files instanceof Array)) {
                return this.sendError(res, undefined, {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'No files uploaded or invalid file format.'
                });
            }

            let files: Express.Multer.File[] = req.files as Express.Multer.File[];

            const { taskType } = req.body;

            const fileMappings = files.map(file => uniqifyFileName(file));

            // Upload files to S3
            const uploadResults = await S3Helper.uploadMultipleFiles(fileMappings.map(({ file }) => file), 'pdf/');

            const filesPath = uploadResults.map(item => item.Key);

            const userId = req.user._id;

            const fileMetadata: FileMetaData[] = uploadResults.map((item, index) => ({
                filePath: item.Key,
                originalName: fileMappings[index].originalName,
            }));

            // Create file records in the database
            const results = await FileService.createFiles(fileMetadata, taskType, userId);

            // Send successful response
            this.sendResponse(res, HttpStatus.OK, results);
        } catch (error) {
            // Handle errors
            this.sendError(res, error);
        }
    }

    async deleteById(req: Request, res: Response): Promise<void> {
        try {
            const validateddData = await deleteFileSchema.validateAsync(req.params);
            const file: FileDocument | null = await FileService.getFileById(validateddData.id);
            if (file === null) {
                this.sendError(res, undefined, {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'File not found!'
                });
                return;
            }
            console.log(file.filePath);
            await S3Helper.deleteFile(file.filePath);
            const fileData: boolean = await FileService.deleteById(validateddData.id);
            if (fileData) {
                this.sendResponse(res, HttpStatus.OK, {
                    message: 'File successfully deleted!'
                });
            } else {
                this.sendError(res, undefined, {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'File not found!'
                });
            }
        } catch (error) {
            this.sendError(res, error);
        }
    }

}

export default new FileController();
