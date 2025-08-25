import Home from "./ProductsClient";

export default async function Page () {

    const response = await fetch("http://localhost:3000/api/product", {cache: "no-store"})
    const products = await response.json();
    const productsInfo = products.productsInfo;

   return <Home products={productsInfo} />;
}
