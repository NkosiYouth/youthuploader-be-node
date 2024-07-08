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