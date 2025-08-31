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

export interface SignInFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  signupEmail: string;
  phone: string;
  signupPassword: string;
  confirmPassword: string;
}

export interface product {
  title: string;
  id: string;
  description: string;
  images: string[];
  slug: string;
  price: number;
  originalPrice: number  | null;
}

export interface productsInfo {
  title: string;
  id: string;
  description: string;
  inStock: boolean;
  images: string[];
  slug: string;
  price: number;
  originalPrice: number  | null;
}

