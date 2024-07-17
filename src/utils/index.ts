export { default as S3Helper } from "./s3";

import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const isValidObjectId = mongoose.isValidObjectId;

// Custom validation function to check if a value is a valid ObjectId
export const isObjectId = (value: any) => {
    return isValidObjectId(value);
};

// Define a transformation function to convert valid ObjectId strings to mongoose.Types.ObjectId
export const toObjectId = (value: any) => {
    if (isValidObjectId(value)) {
        return new mongoose.Types.ObjectId(value);
    }
    return value; // Return as is if not a valid ObjectId
};