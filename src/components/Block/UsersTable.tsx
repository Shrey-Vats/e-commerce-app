"use client";


import { userAdmin } from "@/types/types";
import { UserComponent } from "../ui/UserRow";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


const tableVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const UserTableBlock = ({
  users,
}: {
  users: userAdmin[];
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                Name
              </th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                Email
              </th>
              {/* Role - hidden on small screens */}
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">
                Role
              </th>
              {/* Created At - hidden on smaller screens */}
              <th className="hidden lg:table-cell px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">
                Created At
              </th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body with animations */}
          <motion.tbody
            className="divide-y divide-gray-200"
            variants={tableVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <UserComponent
                    key={user.id}
                    user={user}
                    onDelete={() => {
                      // Handle delete action
                    }}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Users className="w-10 h-10 sm:w-12 sm:h-12 mb-4 text-gray-300" />
                      <p className="text-base sm:text-lg font-medium">
                        No users found
                      </p>
                      <p className="text-xs sm:text-sm">
                        Users will appear here once they register
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};
