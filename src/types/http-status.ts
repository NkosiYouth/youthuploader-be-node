export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  DUPLICATE_DATA = 409,
  NOT_IMPLEMENTED = 509,
}

export interface ErrorDetails {
  statusCode: number;
  message: string;
}