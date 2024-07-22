import { Document, Types } from "mongoose";

export enum UserRole{
  ADMIN = "admin",
  USER = "user"
};

export interface AuthDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export enum TaskTypeEnum {
  SPLIT_AND_RENAME = "split_rename",
  VERIFICATION = "verification"
}

export interface FileDocument extends Document {
  uploadedBy: Types.ObjectId;
  filePath: string;
  isVerified?: boolean;
  taskType?: TaskTypeEnum;
  originalName?: string;
}