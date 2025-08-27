"use client";
import React from "react";
import { Trash2, Calendar, UserCog } from "lucide-react";
import { motion } from "framer-motion";
import { userAdmin } from "@/types/types";

// Animation variants
const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const UserComponent = ({
  user,
  onDelete,
}: {
  user: userAdmin;
  onDelete: (id: string) => void;
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.tr
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
    >
      {/* Name */}
      <td className="px-4 sm:px-6 py-4">
        <div className="font-medium text-gray-900">{user.name}</div>
      </td>

      {/* Email */}
      <td className="px-4 sm:px-6 py-4">
        <div
          className="text-gray-600 text-sm sm:text-base truncate max-w-[8rem] sm:max-w-none"
          title={user.email}
        >
          {user.email}
        </div>
      </td>

      {/* Roles - Hidden on small screens */}
      <td className="hidden md:table-cell px-6 py-4">
        <div className="flex items-center text-gray-600">
          <UserCog className="w-4 h-4 mr-2 text-gray-500" />
          <span className="capitalize">{user.roles ?? "User"}</span>
        </div>
      </td>

      {/* Created At - Hidden on small screens */}
      <td className="hidden lg:table-cell px-6 py-4">
        <div className="flex items-center text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(user.createdAt)}
        </div>
      </td>

      {/* Delete Button */}
      <td className="px-4 sm:px-6 py-4 text-right">
        <button
          onClick={() => onDelete(user.id)}
          className="inline-flex items-center px-2 py-2 sm:px-3 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
        >
          <Trash2 className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </td>
    </motion.tr>
  );
};
