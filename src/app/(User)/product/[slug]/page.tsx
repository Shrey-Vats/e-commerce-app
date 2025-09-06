import { prisma } from "@/lib/prisma"; 
export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
  });

  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const {slug} = await params;

  console.log(slug)
  if (!params.slug)
    return (
      // TODO add a compoents in the components/ui folder for error page with title and description and add later
      <div>
        <h1>Product not found</h1>
        <p>check your url</p>
      </div>
    );
  try {
    const productInfo = await prisma.product.findUnique({
      where: { slug: slug },
    });

    if (!productInfo) {
      return (
        // TODO add a compoents in the components/ui folder for error page with title and description and add later
        <div>
          <h1>Product not found</h1>
          <p>check your url</p>
        </div>
      );
    }

    return (
      <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900 p-5">
        <div className="w-full h-1/12 border">
          <h1 className="text-3xl font-bold">{productInfo.title}</h1>
        </div>
        <div className="w-full h-full flex gap-5">
          <div className="w-6/12 h-10/12 flex rounded-2xl border bg-gray-900">
            <img
              src={productInfo.images[0]}
              alt={productInfo.title}
              className="object-cover rounded-l-2xl h-full w-full "
            />
          </div>
          <div className="w-5/12 h-10/12 flex rounded-2xl border">
            <p className="text-lg font-medium ">{productInfo.description}</p>
            <p
              id="price"
              className="text-2xl font-bold text-green-600 dark:text-green-400 my-4 flex items-center"
            >
              ${productInfo.price}
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    // TODO add a compoents in the components/ui folder for error page with title and description and add later
    return (
      <div>
        <h1>Product not found</h1>
        <p>check your url</p>
      </div>
    );
  }
}
