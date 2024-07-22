import mongoose, { Schema } from "mongoose";
import { DocumentTypeEnum } from "../types"; // Ensure this import is correct
import { PageDocument } from "../types"; // Ensure this import is correct

const PageSchema: Schema<PageDocument> = new Schema({
  fileId: {
    type: Schema.Types.ObjectId,
    ref: 'File',
    required: true,
  },
  pageNumber: {
    type: Number,
    required: true,
  },
  documentType: {
    type: String,
    enum: Object.values(DocumentTypeEnum),
  },
  extractedText: {
    type: [String],
    default: [],
  }
});

const PageModel = mongoose.model<PageDocument>("Page", PageSchema);

export default PageModel;
