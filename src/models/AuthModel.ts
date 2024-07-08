// src/models/AuthModel.ts

import mongoose, { Schema} from "mongoose";
import bcrypt from "bcrypt";
import { AuthDocument, UserRole } from "../types";

const authSchema: Schema<AuthDocument> = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: UserRole
  },
});

// Pre-save hook to hash password before saving
authSchema.pre("save", async function (next: any) {
  const user = this as AuthDocument;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const AuthModel = mongoose.model<AuthDocument>("Auth", authSchema);

export default AuthModel;
