// src/lib/auth.ts
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { AppError } from "./errorHandler";

export async function requireAuth(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  if (!token) {
    throw new AppError("Authentication required", 401);
  }

  return token;
}

export async function requireRole(request: NextRequest, roles: string[]) {
  const token = await requireAuth(request);
  
  if (!token.roles || !roles.some(role => token.roles?.includes(role))) {
    throw new AppError("Insufficient permissions", 403);
  }

  return token;
}