import { Request, Response } from "express";
import { HttpStatus } from "../types";

export default abstract class BaseController {

    protected sendResponse(res: Response, statusCode: HttpStatus =  HttpStatus.OK, data: any) {
      res.status(statusCode as number).json(data);
    }

    protected sendError(res: Response, statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR, message?: string) {
      res.status(statusCode as number).json({ error: message || "Bad Request!" });
    }
  }
