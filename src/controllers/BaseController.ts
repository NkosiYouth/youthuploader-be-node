import { Request, Response } from "express";
import mongoose from 'mongoose';

import { ErrorDetails, HttpStatus } from "../types";

export default class BaseController {

    protected sendResponse(res: Response, statusCode: HttpStatus = HttpStatus.OK, data: any) {
        res.status(statusCode as number).json(data);
    }

    protected sendError(res: Response, error: any, customError?: ErrorDetails) {
        let errorDetails: ErrorDetails;

        if (customError) {
            errorDetails = customError;
        } else if (error instanceof mongoose.Error.ValidationError) {
            errorDetails = {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Validation Error: " + error.message
            };
        } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
            errorDetails = {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Document not found"
            };
        } else if (error instanceof mongoose.Error.CastError) {
            errorDetails = {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Cast Error: " + error.message
            };
        } else if (error instanceof Error) {
            errorDetails = {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            };
        } else {
            errorDetails = {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An unknown error occurred!'
            };
        }

        res.status(errorDetails.statusCode).json({
            message: errorDetails.message
        });
    }

    // Get All Records
    async index(req: Request, res: Response): Promise<void> {
        res.status(HttpStatus.NOT_IMPLEMENTED).json({
            message: 'Not Implemented'
        });
    }

    // Get Record By Id
    async getById(req: Request, res: Response): Promise<void> {
        res.status(HttpStatus.NOT_IMPLEMENTED).json({
            message: 'Not Implemented'
        });
    }

    // Create New
    async create(req: Request, res: Response): Promise<void> {
        res.status(HttpStatus.NOT_IMPLEMENTED).json({
            message: 'Not Implemented'
        });
    }

    // Update By Id
    async updateById(req: Request, res: Response): Promise<void> {
        res.status(HttpStatus.NOT_IMPLEMENTED).json({
            message: 'Not Implemented'
        });
    }

    // Delete By Id
    async deleteById(req: Request, res: Response): Promise<void> {
        res.status(HttpStatus.NOT_IMPLEMENTED).json({
            message: 'Not Implemented'
        });
    }
}