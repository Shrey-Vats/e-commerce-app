"use client"
import type {product} from "@/types/next-auth";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function Home ({products}: {products: product[]}) {
  const router = useRouter();
  const { data: session } = useSession();

  // if (!session?.user._id) {
  //   router.push("/sign-in");
  // }
  console.log(session);

  return (
<div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
  <div className="max-w-7xl mx-auto px-6 py-10">
    {/* Heading */}
<div className="w-full h-auto flex justify-between">
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}>Log Out</button>

      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="h-10 w-10 cursor-pointer hover:drop-shadow-md transition-shadow animate-bounce rounded-full" onClick={() => router.push(`/users/${session?.user.email}`)}/>
</div>
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
      Featured Products
    </h2>

    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product: product) => (
        <div
          onClick={() => {
            router.push(`/product/${product.slug}`);
          }}
          key={product.slug}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col cursor-pointer"
        >
          {/* Product Image */}
          <div className="flex justify-center items-center h-56 bg-gray-100 dark:bg-gray-700 rounded-t-2xl overflow-hidden">
            <img
              className="object-contain h-full p-6"
              src={product.images}
              alt={product.title}
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col p-5">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
              {product.title}
            </h5>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {product.description}
            </p>

            <div className="mt-auto flex items-center justify-between pt-4">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  )
}