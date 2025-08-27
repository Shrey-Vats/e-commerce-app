import z from "zod";

export const updateUser = z.object({
    name: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    roles: z.string().optional().default("USER"),
})