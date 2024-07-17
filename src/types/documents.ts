import { Document } from "mongoose";

export  enum UserRole{
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

export interface FileDocument extends Document {

}
