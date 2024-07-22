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

export interface OrganizationDocument extends Document{
  name: string;
}


export enum DocumentTypeEnum{
  PASSPORT = "Passport",
  ID = "ID",
}

export interface PageDocument extends Document{
  fileId: Types.ObjectId;
  pageNumber: number;
  documentType: DocumentTypeEnum,
  extractedText: string[]
}