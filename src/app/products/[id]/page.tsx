import Image from "next/image";
import Link from "next/link";
import { products } from "@/common/lib/data";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ShoppingCart,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Heart,
  Share2,
  CheckCircle,
} from "lucide-react";
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
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-black to-purple-900/5 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <div className="relative container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        {/* Enhanced Back Button */}
        <Link
          href="/"
          className="group inline-flex items-center gap-3 mb-8 lg:mb-12 px-4 py-3 bg-gray-900/50 backdrop-blur-xl border border-green-500/20 rounded-xl hover:border-green-500/40 hover:bg-gray-800/50 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 text-green-400 group-hover:-translate-x-1 transition-transform" />
          <span className="text-green-400 font-medium">Back to Shop</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Enhanced Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-green-500/20 group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhZPwAI/ALr4wIp2gAAAABJRU5ErkJggg=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Image Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-3 bg-black/50 backdrop-blur-xl rounded-xl border border-gray-600/50 hover:border-red-400/50 hover:bg-red-500/20 transition-all">
                  <Heart className="w-5 h-5 text-gray-300 hover:text-red-400" />
                </button>
                <button className="p-3 bg-black/50 backdrop-blur-xl rounded-xl border border-gray-600/50 hover:border-green-400/50 hover:bg-green-500/20 transition-all">
                  <Share2 className="w-5 h-5 text-gray-300 hover:text-green-400" />
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery (Placeholder) */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="aspect-square bg-gray-800 rounded-xl border-2 border-gray-700 hover:border-green-400 transition-colors cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Enhanced Details Section */}
          <div className="flex flex-col space-y-8">
            {/* Header with Rating */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
                  Bestseller
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">4.8</span>
                  <span className="text-gray-500 text-sm">(128 reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <p className="text-green-400 text-4xl lg:text-5xl font-bold">
                  ₹{product.price}
                </p>
                <p className="text-gray-500 text-xl line-through">
                  ₹{(product.price * 1.2).toFixed(0)}
                </p>
                <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm font-medium">
                  Save 20%
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Description</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              {[
                {
                  icon: Truck,
                  text: "Free Shipping",
                  subtext: "On orders over ₹500",
                },
                {
                  icon: Shield,
                  text: "Secure Payment",
                  subtext: "100% protected",
                },
                {
                  icon: RotateCcw,
                  text: "30-Day Returns",
                  subtext: "No questions asked",
                },
                {
                  icon: CheckCircle,
                  text: "In Stock",
                  subtext: "Ready to ship",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl border border-gray-700/50"
                >
                  <feature.icon className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium text-sm">
                      {feature.text}
                    </p>
                    <p className="text-gray-500 text-xs">{feature.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Add to Cart Button */}
                <button className="group flex-1 flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 border border-gray-600 hover:border-gray-500 shadow-lg">
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>

                {/* Buy Now Button */}
                <div className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-bold py-4 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-2xl shadow-green-500/25">
                  <PaymentButton
                    amount={product.price}
                    customerName="John Doe"
                    customerEmail="john.doe@example.com"
                    customerPhone="1234567890"
                    className="w-full flex items-center justify-center gap-3"
                  />

                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-4 justify-center">
                <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm">
                  <Heart className="w-4 h-4" />
                  Add to Wishlist
                </button>
                <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm">
                  <Share2 className="w-4 h-4" />
                  Share Product
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-800 pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-gray-900/30 rounded-xl">
                  <p className="text-green-400 font-semibold">Free Delivery</p>
                  <p className="text-gray-500">in 2-4 days</p>
                </div>
                <div className="text-center p-3 bg-gray-900/30 rounded-xl">
                  <p className="text-green-400 font-semibold">Easy Returns</p>
                  <p className="text-gray-500">30-day policy</p>
                </div>
                <div className="text-center p-3 bg-gray-900/30 rounded-xl">
                  <p className="text-green-400 font-semibold">
                    Secure Checkout
                  </p>
                  <p className="text-gray-500">SSL protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="mt-20 lg:mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              You might also like
            </h2>
            <Link
              href="/"
              className="text-green-400 hover:text-green-300 font-medium flex items-center gap-2"
            >
              View All
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-4 border border-green-500/20 hover:border-green-500/40 transition-all hover:scale-105"
              >
                <div className="aspect-square bg-gray-800 rounded-xl mb-3 relative overflow-hidden">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 truncate">
                  {relatedProduct.name}
                </h3>
                <p className="text-green-400 font-bold">
                  ₹{relatedProduct.price}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}