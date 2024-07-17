export { default as S3Helper } from "./s3";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import { File } from "../types";

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

export const uniqifyFileName = (file: File): File => {
    const fileExtension = path.extname(file.originalname);
    const filename = `${uuidv4()}${fileExtension}`;
    return {
        ...file,
        originalname: filename,
    };
}