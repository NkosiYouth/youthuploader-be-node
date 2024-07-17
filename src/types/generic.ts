export interface File {
  path: string;
  filename: string;
}

export interface DecodedToken {
  id: string;
  email: string;
  role: string;  // Add other properties as needed
  iat?: number;  // issued at
  exp?: number;  // expiration time
}

export interface File extends Express.Multer.File {
  path: string;
  filename: string;
  mimetype: string;
  originalname: string;
  size: number;
}
