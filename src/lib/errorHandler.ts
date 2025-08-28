import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@/generated/prisma";

export interface ApiError {
  success: false;
  error: string;
  details?: any;
  statusCode: number;
}

export interface ApiSuccess<T = any> {
  success: true;
  data?: T;
  message?: string;
}

export type ApiResponse<T = any> = ApiSuccess<T> | ApiError;

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleApiError(error: any): NextResponse<ApiError> {
  console.error("API Error:", error);

// it will add on future for now skip
//   if (error instanceof ZodError) {
//     const details = error.errors.map(err => ({
//       field: err.path.join('.'),
//       message: err.message
//     }));
    
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Validation failed",
//         details,
//         statusCode: 400
//       },
//       { status: 400 }
//     );
//   }

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return NextResponse.json(
          {
            success: false,
            error: "Resource already exists",
            details: error.meta,
            statusCode: 409
          },
          { status: 409 }
        );
      case 'P2025':
        return NextResponse.json(
          {
            success: false,
            error: "Resource not found",
            statusCode: 404
          },
          { status: 404 }
        );
      case 'P2003':
        return NextResponse.json(
          {
            success: false,
            error: "Foreign key constraint failed",
            statusCode: 400
          },
          { status: 400 }
        );
      default:
        return NextResponse.json(
          {
            success: false,
            error: "Database operation failed",
            statusCode: 500
          },
          { status: 500 }
        );
    }
  }

  // Custom App errors
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        statusCode: error.statusCode
      },
      { status: error.statusCode }
    );
  }

  // Default server error
  return NextResponse.json(
    {
      success: false,
      error: "Internal server error",
      statusCode: 500
    },
    { status: 500 }
  );
}

export function createApiResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiSuccess<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message
    },
    { status }
  );
}