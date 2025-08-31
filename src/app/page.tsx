import HomePage from "@/components/HomePage";
import { product } from "@/types/types";
import { prisma } from "@/lib/prisma";
export default async function Page() {
 try {
        const products = await prisma.product.findMany()

         return <HomePage products={products} />;
    } catch (error) {
        console.error("Error fetching products:", error);
    }

}
