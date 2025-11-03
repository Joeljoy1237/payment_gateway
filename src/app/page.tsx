import ProductCard from "@/common/components/ProductCard";
import { products } from "@/common/lib/data";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-green-400 font-bold mb-6 leading-tight">
            Dummy Clothes Shop
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the latest fashion trends with our premium collection of
            clothing
          </p>
        </div>
      </section>

      {/* Header with Orders Link */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl text-green-400 font-bold">
            Featured Products
          </h2>
          <p className="text-gray-600 mt-2">Browse our top picks</p>
        </div>
        <Link
          href="/orders"
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          View Orders →
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </main>
  );
}
