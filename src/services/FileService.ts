import { Types } from "mongoose";
import { FileModel } from "../models";
import { FileDocument, TaskTypeEnum } from "../types";

class FileService{
    async createFiles(filePaths: string[], userId: Types.ObjectId): Promise<FileDocument[]> {
        const fileRecords = filePaths.map(filePath => ({
            filePath,
            uploadedBy: userId
        }));
        return FileModel.insertMany(fileRecords);
    }
}

export default new FileService();