"use client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { ProductSchema, type Product } from "@/Schemas/ProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateProductPage() {

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      images: [""],
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "images",
    control,
  });

  const router = useRouter();

  const onSumbit: SubmitHandler<Product> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/product/add`, data);
      console.log(response);

      if (!response.data.success) {
        return console.log(response.data.message);
      }
      router.push("/product/" + response.data.product.slug);
    } catch (error) {
      console.error("Failed to create product:", error);
      // You might want to show a user-friendly error message here
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Product
        </h1>
        <form onSubmit={handleSubmit(onSumbit)} className="space-y-5">
          {/* Title */}
          <div>
            <input
              type="text"
              {...register("title")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              placeholder="Title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              {...register("description")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              placeholder="Description"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price (Float) */}
          <div>
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              placeholder="Price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* Dynamic Images Field Array */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700">Images</h2>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-3">
                <input
                  type="url"
                  {...register(`images.${index}` as const)}
                  placeholder="Image URL"
                  className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append("")}
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
            >
              + Add Image
            </button>
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">
                {typeof errors.images.message === "string"
                  ? errors.images.message
                  : "Please check the image URLs."}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <input
              type="text"
              {...register("categoryId")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              placeholder="Category ID"
            />
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Brand */}
          <div>
            <input
              type="text"
              {...register("brandId")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              placeholder="Brand ID"
            />
            {errors.brandId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brandId.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={!isValid}
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
