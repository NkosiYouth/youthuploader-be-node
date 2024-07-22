import mongoose, { Schema, Types, Document } from "mongoose";
import { OrganizationDocument, TaskTypeEnum } from "../types";

const organizationSchema: Schema<OrganizationDocument> = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const OrganizationModel = mongoose.model<OrganizationDocument>("Organization", organizationSchema);

export default OrganizationModel;
