import { Request } from 'express';
import { Role } from 'src/generated/prisma/enums';

export interface JwtPayload {
  sub: number;
  fullname: string;
  email: string;
  role: Role;
}

export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface RequestWithUser extends Request {
  user: JwtPayload;
}

export interface RequestWithGoogleUser extends Request {
  user: GoogleUser;
}
