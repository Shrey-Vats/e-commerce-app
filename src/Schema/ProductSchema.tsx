import { z } from "zod";

export const ProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.float32().min(0, "Price must be positive"),
  images: z.array(z.string().url("Invalid image URL")),
  categoryId: z.string().min(1, "Category is required"),
  brandId: z.string().min(1, "Brand is required"),
});

export type Product = z.infer<typeof ProductSchema>;
