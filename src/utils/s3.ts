import { config } from 'dotenv';
import S3 from 'aws-sdk/clients/s3';
import fs, { ReadStream } from 'fs';
import { Readable } from 'stream';
import { File } from '../types';

// Load environment variables from .env file
config();

// Ensure environment variables are defined
const bucketName = process.env.AWS_S3_BUCKET_NAME as string;
const region = process.env.AWS_S3_REGION as string;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY as string;
const secretAccessKey = process.env.AWS_S3_SECRET_KEY as string;

if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
    throw new Error('Environment variables for AWS S3 are not set correctly');
}

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

export function uploadFile(file: File, prefix: string = ""): Promise<S3.ManagedUpload.SendData> {
    const fileStream: ReadStream = fs.createReadStream(file.path);
    const uploadParams: S3.PutObjectRequest = {
        Bucket: bucketName,
        Body: fileStream,
        Key: `${prefix}${file.filename}`,
    };
    return s3.upload(uploadParams).promise();
}

export function getFile(key: string): Readable {
    const downloadParams: S3.GetObjectRequest = {
        Bucket: bucketName,
        Key: key,
    };
    return s3.getObject(downloadParams).createReadStream();
}

export function deleteFile(key: string): Promise<S3.DeleteObjectOutput> {
    const deleteParams: S3.DeleteObjectRequest = {
        Bucket: bucketName,
        Key: key,
    };

    return s3.deleteObject(deleteParams).promise();
}
