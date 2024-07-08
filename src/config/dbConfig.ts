import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURI: string = process.env.MONGODB_URI || '';

if (!dbURI) {
  console.error('MONGODB_URI environment variable not set.');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('DB Connected Successfully.');
  } catch (error: any) {
    if (error instanceof Error) {
      console.error(`DB Error: ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
    }
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;