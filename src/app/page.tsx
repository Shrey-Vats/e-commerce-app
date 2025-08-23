"use client";
import { signOut } from "next-auth/react";
export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col bg-gray-100 ">
      <div className="text-3xl font-bold mb-4">
        Welcome to ShopSee
        <span className="text-sm font-medium text-gray-600">
          {" "}
          - Your one-stop shop for all things fashion
        </span>
      </div>
      <div className="text-lg font-medium text-gray-600 mb-8">
        Discover the latest trends and timeless classics from top brands
      </div>
      <div className="text-lg font-medium text-gray-600 mb-8">
        Shop the new arrivals and exclusive collections
      </div>
      <button
        onClick={() => {
          signOut();
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Logout
      </button>
    </div>
  );
}
