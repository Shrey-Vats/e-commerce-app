import { Role } from "@/generated/prisma";

export interface User {
  _id?: string;
  id: string;
  name?: string;
  email?: string;
  password?: string;
  image?: string;
  roles: Role[];  
  isVerified?: boolean;
}

export interface UpdateUser {
  name?: string;
  password?: string;
  roles?: Role[];  
}

export interface userAdmin {
  id: string;
  name?: string | null;
  email: string;
  createdAt: string;
  roles: Role[];  
}
