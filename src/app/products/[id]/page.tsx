import Image from "next/image";
import Link from "next/link";
import { products } from "@/common/lib/data";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingCart, CreditCard } from "lucide-react"; // Optional: install lucide-react
import PaymentButton from "@/common/components/PaymentButton";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-6 md:p-12 max-w-6xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="relative h-96 md:h-full min-h-[400px] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhZPwAI/ALr4wIp2gAAAABJRU5ErkJggg=="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {product.name}
              </h1>
              <p className="text-green-400 text-3xl font-bold">
                &#8377;{product.price}
              </p>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Add to Cart Button */}
              <button className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              {/* Buy Now (Payment) Button */}
              <div className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                <CreditCard className="w-5 h-5" />
                <PaymentButton
                  amount={product.price}
                  customerName="John Doe"
                  customerEmail="john.doe@example.com"
                  customerPhone="1234567890"
                />
              </div>
            </div>

            {/* Extra Info (Optional) */}
            <div className="border-t border-gray-800 pt-6 mt-6">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                <div>
                  <span className="text-green-400">✓ Free Shipping</span> on
                  orders over &#8377;500
                </div>
                <div>
                  <span className="text-green-400">✓ 30-Day Returns</span>{" "}
                  guaranteed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
