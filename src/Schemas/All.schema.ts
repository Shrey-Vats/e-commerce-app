import { z } from "zod";

/* 🔹 Common Reusable Validations */
export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters long")
  .max(20, "Username must be at most 20 characters long");

export const emailValidation = z
  .string()
  .email("Invalid email address")
  .max(50, "Email must be at most 50 characters long");

export const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(50, "Password must be at most 50 characters long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  );

const phoneValidation = z
  .string()
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number is too long");

const addressBaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: phoneValidation,
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zip: z.string().min(1, "ZIP code is required"),
});

/* 🔹 Auth Schemas */
export const signUpSchema = z.object({
  name: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});

export const signInSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, "Password is required"),
});

export const verifySchema = z.object({
  token: z.string(),
});

/* 🔹 User Update */
export const updateUserSchema = z.object({
  name: usernameValidation.optional(),
  password: passwordValidation.optional(),
  roles: z.enum(["USER", "ADMIN", "SELLER"]).array().optional(),
});

export const updateUser = z.object({
  name: usernameValidation.optional(),
  password: z.string().min(6).optional(),
  roles: z.enum(["USER", "ADMIN", "SELLER"]).default("USER"),
});

/* 🔹 Product */
export const productSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image required"),
  categoryId: z.string().min(1, "Category is required").optional(),
  brandId: z.string().min(1, "Brand is required").optional(),
  price: z.number().positive("Price must be positive"),
  comparePrice: z.number().positive().optional(),
  costPrice: z.number().positive().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  weight: z.number().positive().optional(),
  dimensions: z
    .object({
      length: z.number().positive(),
      width: z.number().positive(),
      height: z.number().positive(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});

/* 🔹 Category & Brand */
export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  parentId: z.string().optional(),
  image: z.string().url().optional(),
});

export const brandSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  logo: z.string().url().optional(),
});

/* 🔹 Cart */
export const addToCartSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  variantId: z.string().optional(),
  quantity: z.number().int().positive().max(10, "Max 10 items allowed"),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive().max(10, "Max 10 items allowed"),
});

/* 🔹 Orders */
export const createOrderSchema = z.object({
  shippingAddress: addressBaseSchema,
  billingAddress: addressBaseSchema.optional(),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

/* 🔹 Review */
export const reviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  rating: z.number().int().min(1, "Minimum rating is 1").max(5, "Maximum rating is 5"),
  title: z.string().max(100).optional(),
  comment: z.string().max(1000).optional(),
  images: z.array(z.string().url()).optional(),
});

/* 🔹 Address */
export const addressSchema = addressBaseSchema.extend({
  label: z.string().min(1, "Label is required"),
  isDefault: z.boolean().optional(),
});

/* 🔹 Simplified Product */
export const ProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().nonnegative("Price must be positive"),
  images: z.array(z.string().url("Invalid image URL")),
  categoryId: z.string().min(1, "Category is required"),
  brandId: z.string().min(1, "Brand is required"),
});

export type Product = z.infer<typeof ProductSchema>;
