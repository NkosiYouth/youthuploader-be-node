import mongoose, { Schema, Types, Document } from "mongoose";
import { FileDocument, TaskTypeEnum } from "../types";

const fileSchema: Schema<FileDocument> = new Schema({
  filePath: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: false
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  taskType: {
    type: String,
    enum: Object.values(TaskTypeEnum),
  },
}, {
  timestamps: true,
});

const FileModel = mongoose.model<FileDocument>("File", fileSchema);

export default FileModel;
