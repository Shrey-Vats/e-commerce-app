import { z } from "zod";


export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
           "Password must contain uppercase, lowercase, number and special character"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  password: z.string().min(8).optional(),
  roles: z.array(z.enum(["USER", "ADMIN", "SELLER"])).optional(),
});


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
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
  }).optional(),
  tags: z.array(z.string()).optional(),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
});


export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  parentId: z.string().optional(),
  image: z.string().url().optional(),
});


export const brandSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  logo: z.string().url().optional(),
});


export const addToCartSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  variantId: z.string().optional(),
  quantity: z.number().int().positive("Quantity must be positive").max(10),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive("Quantity must be positive").max(10),
});


export const createOrderSchema = z.object({
  shippingAddress: z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(10, "Valid phone number required"),
    line1: z.string().min(1, "Address line 1 is required"),
    line2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    zip: z.string().min(1, "ZIP code is required"),
  }),
  billingAddress: z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(10, "Valid phone number required"),
    line1: z.string().min(1, "Address line 1 is required"),
    line2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    zip: z.string().min(1, "ZIP code is required"),
  }).optional(),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

// Review 
export const reviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  title: z.string().max(100).optional(),
  comment: z.string().max(1000).optional(),
  images: z.array(z.string().url()).optional(),
});

// Address Schema
export const addressSchema = z.object({
  label: z.string().min(1, "Label is required"),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zip: z.string().min(1, "ZIP code is required"),
  isDefault: z.boolean().optional(),
});