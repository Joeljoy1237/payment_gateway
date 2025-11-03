// src/app/payment/success/page.tsx
import React from "react";
import Link from "next/link";
import { CheckCircle, Home, Package, CreditCard } from "lucide-react";

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const orderId = params.orderId || "N/A";
  const paymentId = params.paymentId || "N/A";

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Animated radial glow background */}
      <div className="absolute inset-0 bg-linear-to-br from-green-900/30 via-black to-black pointer-events-none" />

      <div className="relative max-w-md w-full bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6 border border-green-500/30 overflow-hidden">
        {/* Success Animation Circle */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-3xl opacity-40 animate-pulse"></div>
            <div className="relative bg-gray-800 p-4 rounded-full border-2 border-green-500 shadow-lg">
              <CheckCircle className="w-14 h-14 text-green-400" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
              Payment Successful!
            </h1>
            <p className="mt-2 text-gray-400 text-sm">
              Your transaction has been completed securely.
            </p>
          </div>
        </div>

        {/* Order & Payment Details */}
        <div className="space-y-4 bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-green-500/20">
          <div className="flex items-center gap-3 text-sm">
            <Package className="w-5 h-5 text-green-400" />
            <div className="flex-1 text-left">
              <p className="text-gray-500">Order ID</p>
              <p className="font-mono text-green-300 text-xs break-all">{orderId}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <CreditCard className="w-5 h-5 text-green-400" />
            <div className="flex-1 text-left">
              <p className="text-gray-500">Payment ID</p>
              <p className="font-mono text-green-300 text-xs break-all">{paymentId}</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            A confirmation email has been sent to your inbox.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition transform hover:scale-105 shadow-lg"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            href="/orders"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-green-500/50 text-green-400 font-medium rounded-xl hover:bg-green-500/10 transition backdrop-blur-sm"
          >
            <Package className="w-4 h-4" />
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}