// src/app/orders/page.tsx
import { use } from "react";
import Link from "next/link";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  Home,
  RotateCcw,
  Loader2,
  Search,
  Filter,
  Calendar,
  IndianRupee,
} from "lucide-react";
import { getAllOrders } from "@/common/lib/razorpayHelper";
import RefundButton from "@/common/components/RefundButton";
import type { ExtendedOrder } from "@/common/lib/razorpayHelper";

export default function OrdersPage() {
  const orders = use(getAllOrders());

  const getStatusIcon = (status: ExtendedOrder["status"]) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "created":
      case "attempted":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case "refunded":
        return <RotateCcw className="w-5 h-5 text-purple-400" />;
      case "pending":
        return <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ExtendedOrder["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-300 border-green-500/40";
      case "created":
      case "attempted":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/40";
      case "refunded":
        return "bg-purple-500/20 text-purple-300 border-purple-500/40";
      case "pending":
        return "bg-orange-500/20 text-orange-300 border-orange-500/40";
      case "failed":
        return "bg-red-500/20 text-red-300 border-red-500/40";
      default:
        return "bg-gray-700/20 text-gray-300 border-gray-600/40";
    }
  };

  const getGradientByStatus = (status: ExtendedOrder["status"]) => {
    switch (status) {
      case "paid":
        return "from-green-500/5 to-green-500/10";
      case "created":
      case "attempted":
        return "from-yellow-500/5 to-yellow-500/10";
      case "refunded":
        return "from-purple-500/5 to-purple-500/10";
      case "pending":
        return "from-orange-500/5 to-orange-500/10";
      case "failed":
        return "from-red-500/5 to-red-500/10";
      default:
        return "from-gray-500/5 to-gray-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-purple-900/5 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none delay-1000" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Enhanced Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-lg opacity-50 animate-pulse" />
              <Package className="relative w-12 h-12 text-green-400" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 bg-clip-text text-transparent animate-gradient">
            Order History
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Track, manage, and review all your purchases in one place
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Package className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{orders.length}</p>
                <p className="text-xs text-gray-400">Total Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {orders.filter((o) => o.status === "paid").length}
                </p>
                <p className="text-xs text-gray-400">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between p-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 backdrop-blur-xl border border-green-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 transition-colors"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-3 bg-gray-900/50 backdrop-blur-xl border border-green-500/20 rounded-xl text-gray-300 hover:text-white hover:border-green-400/40 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
              3
            </span>
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-6">
                <div className="absolute -inset-6 bg-green-500/10 rounded-full blur-2xl" />
                <Package className="relative w-20 h-20 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-500 mb-6 max-w-sm">
                Start shopping to see your orders appear here
              </p>
              <Link
                href="/"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-semibold rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all transform hover:scale-105 shadow-lg shadow-green-500/25"
              >
                <Home className="w-5 h-5" />
                Start Shopping
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {orders.map((order) => {
                const canRefund = order.status === "paid";
                const amountInRupees = Number(order.amount) / 100;

                return (
                  <div
                    key={order.id}
                    className={`group relative bg-gradient-to-r ${getGradientByStatus(
                      order.status
                    )} backdrop-blur-xl rounded-2xl p-1 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10`}
                  >
                    <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-xl p-6">
                      {/* Status Badge */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          {/* Status Icon */}
                          <div
                            className={`p-3 rounded-xl border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                          </div>

                          {/* Order Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                              <h3 className="font-mono text-green-300 font-semibold text-sm truncate">
                                {order.id}
                              </h3>
                              <div
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium capitalize ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {getStatusIcon(order.status)}
                                {order.status}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <IndianRupee className="w-4 h-4 text-green-400" />
                                <div>
                                  <p className="text-gray-500 text-xs">
                                    Amount
                                  </p>
                                  <p className="font-semibold text-green-400 text-lg">
                                    ₹{amountInRupees}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Package className="w-4 h-4 text-blue-400" />
                                <div>
                                  <p className="text-gray-500 text-xs">Items</p>
                                  <p className="font-medium">Test Product</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-purple-400" />
                                <div>
                                  <p className="text-gray-500 text-xs">
                                    Order Date
                                  </p>
                                  <p className="font-medium">
                                    {new Date(
                                      order.created_at * 1000
                                    ).toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:items-end gap-3">
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/orders/${order.id}`}
                              className="group/view inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-all border border-green-500/20 hover:border-green-500/40"
                            >
                              View Details
                              <ArrowRight className="w-4 h-4 group-hover/view:translate-x-1 transition-transform" />
                            </Link>

                            {canRefund && (
                              <RefundButton
                                orderId={order.id}
                                amount={amountInRupees}
                                status={order.status}
                                className="px-4 py-2 bg-orange-500/10 text-orange-400 rounded-lg hover:bg-orange-500/20 transition-all border border-orange-500/20 hover:border-orange-500/40 font-medium"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Enhanced Bottom CTA */}
        {orders.length > 0 && (
          <div className="text-center pt-8 pb-12">
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-2xl hover:from-green-400 hover:to-emerald-500 transition-all transform hover:scale-105 shadow-2xl shadow-green-500/25 hover:shadow-green-500/40"
              >
                <Home className="w-5 h-5" />
                Continue Shopping
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-gray-500 text-sm">
                {orders.length} order{orders.length !== 1 ? "s" : ""} in total
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}