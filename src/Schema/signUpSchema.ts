import { z } from "zod";
export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters long")
  .max(20, "Username must be at most 20 characters long")


  export const emailValidation = z
  .string()
  .email("Invalid email address")
  .min(2, "Email must be at least 2 characters long")
  .max(50, "Email must be at most 50 characters long")
  .regex(/a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {message: "Invalid email format"});

  export const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(50, "Password must be at most 50 characters long")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");

export const signUpSchema = z.object({
  name: usernameValidation,
  email: z
    .string()
    .email("Invalid email address")
    .min(2, "Email must be at least 2 characters long")
    .max(50, "Email must be at most 50 characters long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long"),
});
