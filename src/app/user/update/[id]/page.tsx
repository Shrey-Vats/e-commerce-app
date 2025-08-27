"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

// ✅ Zod schema (make roles required so TS stops complaining)
const updateUser = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roles: z.enum(["ADMIN", "USER", "SELLER"], {
    error: "Role is required",
  }),
});

type UpdateUser = z.infer<typeof updateUser>;

const rolesOptions = ["ADMIN", "USER", "SELLER"] as const;

export default function Page({ params }: { params: { id: string } }) {
 const paramss = useParams<{ id: string }>(); // ✅ type safe
  const id = paramss.id;
  const [isUpdating, setUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UpdateUser>({
    resolver: zodResolver(updateUser),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = async (data: UpdateUser) => {
    setUpdating(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/update/${id}`,
        data
      );
      console.log("User updated:", response.data);
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Update User
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Roles Dropdown */}
          <div>
            <select
              {...register("roles")}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Role</option>
              {rolesOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.roles && (
              <p className="text-red-400 text-sm mt-1">
                {errors.roles.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={!isValid || isUpdating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-2 rounded-xl font-semibold transition-all duration-300 ${
              isUpdating
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isUpdating ? "Updating..." : "Update User"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
