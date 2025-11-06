import ProductCard from "@/common/components/ProductCard";
import { products } from "@/common/lib/data";
import Link from "next/link";
import {
  ShoppingBag,
  Star,
  TrendingUp,
  Shield,
  Truck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const featuredProducts = products.slice(0, 4);
  const trendingProducts = products.slice(2, 6);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-black to-purple-900/5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Hero Section */}
        <section className="text-center relative mb-16 lg:mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent pointer-events-none" />

          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-green-400 text-sm font-medium">
              Premium Fashion Collection
            </span>
          </div>

          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 bg-clip-text text-transparent animate-gradient">
                Dummy Clothes
              </span>
              <br />
              <span className="text-white">Shop</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover the latest fashion trends with our premium collection of
              <span className="text-green-400 font-semibold">
                {" "}
                stylish clothing
              </span>
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
              {[
                { icon: Truck, text: "Free Shipping" },
                { icon: Shield, text: "Secure Payment" },
                { icon: Star, text: "Premium Quality" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <item.icon className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="#featured"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-2xl hover:from-green-400 hover:to-emerald-500 transition-all transform hover:scale-105 shadow-2xl shadow-green-500/25"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/orders"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-800/50 backdrop-blur-xl border border-green-500/30 text-green-400 rounded-2xl hover:bg-gray-700/50 hover:border-green-400/50 transition-all transform hover:scale-105"
              >
                View Orders
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { number: "500+", label: "Happy Customers" },
            { number: "50+", label: "Products" },
            { number: "24/7", label: "Support" },
            { number: "100%", label: "Secure" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all group hover:scale-105"
            >
              <p className="text-2xl lg:text-3xl font-bold text-green-400 mb-2">
                {stat.number}
              </p>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Featured Products Section */}
        <section id="featured" className="mb-20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/20 rounded-xl">
                  <Star className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Featured Products
                </h2>
              </div>
              <p className="text-xl text-gray-300 max-w-2xl">
                Handpicked selection of our most popular and trending items
              </p>
            </div>

            <Link
              href="/orders"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl hover:bg-green-500/20 hover:border-green-400/50 transition-all transform hover:scale-105"
            >
              View All Orders
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </section>

        {/* Trending Products Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-orange-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Trending Now
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center bg-gradient-to-r from-green-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-12 border border-green-500/20">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Upgrade Your Style?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their fashion
            needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#featured"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-2xl hover:from-green-400 hover:to-emerald-500 transition-all transform hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
            <Link
              href="/orders"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-800/50 backdrop-blur-xl border border-green-500/30 text-green-400 rounded-2xl hover:bg-gray-700/50 hover:border-green-400/50 transition-all"
            >
              Track Orders
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}