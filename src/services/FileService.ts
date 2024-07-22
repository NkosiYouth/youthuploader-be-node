import { Types } from "mongoose";
import { FileModel } from "../models";
import { FileDocument, FileMetaData, TaskTypeEnum } from "../types";

class FileService {
    async createFiles(fileMetaData: FileMetaData[], taskType: TaskTypeEnum, userId: Types.ObjectId): Promise<FileDocument[]> {
        const fileRecords = fileMetaData.map(data=> ({
            filePath: data.filePath,
            originalName: data.originalName,
            uploadedBy: userId,
            taskType: taskType
        }));
        return FileModel.insertMany(fileRecords);
    }

    async getAllFiles(userId?: Types.ObjectId): Promise<FileDocument[]> {
        const query = userId ? { uploadedBy: userId } : {};
        const data: FileDocument[] = await FileModel.find(query);
        return data;
    }

    async getFileById(id: Types.ObjectId | string): Promise<FileDocument | null> {
        const data: FileDocument | null = await FileModel.findById(id);
        if (data) return data;
        return null;
    }

    async deleteById(id: Types.ObjectId | string): Promise<boolean> {
        const result = await FileModel.findByIdAndDelete(id);
        return result !== null;
    };
}

export default new FileService();