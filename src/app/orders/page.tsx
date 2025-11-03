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
} from "lucide-react";
import { getAllOrders } from "@/common/lib/razorpayHelper";
import RefundButton from "@/common/components/RefundButton";

export default function OrdersPage() {
  const mockOrders = use(getAllOrders());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "created":
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case "refunded":
        return <RotateCcw className="w-5 h-5 text-purple-400" />; // use refund-like icon
      default:
        return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "created":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "refunded":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      default:
        return "bg-red-500/10 text-red-400 border-red-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-green-900/20 via-black to-black pointer-events-none" />

      <div className="relative max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center pt-8 pb-6">
          <h1 className="text-4xl font-bold bg-linear-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
            Your Orders
          </h1>
          <p className="mt-2 text-gray-400">
            Track and manage all your purchases
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {mockOrders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No orders yet.</p>
              <Link
                href="/"
                className="mt-4 inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition"
              >
                Start Shopping <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            mockOrders.map((order) => {
              const canRefund = order.status === "paid";
              const amountInRupees = parseInt(order.amount.toString()) / 100;

              return (
                <div
                  key={order.id}
                  className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 shadow-xl hover:border-green-500/40 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left: Order Info */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <Package className="w-6 h-6 text-green-400" />
                        <div>
                          <p className="font-mono text-green-300 font-semibold">
                            {order.id}
                          </p>
                          <p className="text-xs text-gray-500">
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

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Amount</p>
                          <p className="font-medium text-green-400">
                            ₹{amountInRupees}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Items</p>
                          <p className="font-medium">Test Product</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Status + Actions */}
                    <div className="flex flex-col items-end gap-3">
                      <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium capitalize ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-4 text-sm">
                        <Link
                          href={`/orders/${order.id}`}
                          className="flex items-center gap-1 text-green-400 hover:text-green-300 transition font-medium"
                        >
                          View Details <ArrowRight className="w-3 h-3" />
                        </Link>

                        {/* Refund Button – Only for paid */}
                        {canRefund && (
                          <RefundButton
                            orderId={order.id}
                            amount={parseInt(order.amount.toString()) / 100}
                            status={order.status}
                            className="text-orange-400 hover:text-orange-300 font-medium"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition transform hover:scale-105 shadow-lg"
          >
            <Home className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
