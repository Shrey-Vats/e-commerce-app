
import axios from "axios";
import type { product } from "@/types/next-auth";
// import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma"; // or your db



export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true }
  });

  return products.map((p) => ({ slug: p.slug }));
}


export default async function ProductPage({ params }: {params: {slug: string}}){

   const paramsSlug = params.slug;

    const response = await axios.get(`http://localhost:3000/api/product/get/${paramsSlug}`);
    const product: product = response.data.productInfo;

    // if(!product) return notFound();

    return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900 p-5">
        <div className="w-full h-1/12 border">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        </div>
        <div className="w-full h-full flex gap-5">
<div className="w-6/12 h-10/12 flex rounded-2xl border bg-gray-900">
        <img src={product.images} alt={product.title} className="object-cover rounded-l-2xl h-full w-full " />
        </div>
        <div className="w-5/12 h-10/12 flex rounded-2xl border">
        <p className="text-lg font-medium ">{product.description}</p>
        <p id="price" className="text-2xl font-bold text-green-600 dark:text-green-400 my-4 flex items-center">${product.price}</p>
        </div>
        </div>

    </div>);
}