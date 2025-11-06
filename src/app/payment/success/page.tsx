// src/app/payment/success/page.tsx
"use client";
import React from "react";
import Link from "next/link";
import {
  CheckCircle,
  Home,
  Package,
  CreditCard,
  Download,
  Mail,
  Calendar,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccess({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const [params, setParams] = useState<Record<string, string>>({});
  const [orderDate, setOrderDate] = useState<string | null>(null);
  const router = useRouter();
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    // Handle async searchParams in client component
    const loadParams = async () => {
      const resolvedParams = await searchParams;
      setParams(resolvedParams);
    };
    loadParams();
  }, [searchParams]);

  useEffect(() => {
    function getFormattedDate() {
      const formatted = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setOrderDate(formatted);
    }
    getFormattedDate();
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  const orderId = params?.orderId || "N/A";
  const paymentId = params?.paymentId || "N/A";

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-emerald-900/10 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      {/* Floating Confetti */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-bounce" />
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-emerald-300 rounded-full animate-bounce delay-500" />
      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-green-300 rounded-full animate-bounce delay-300" />

      <div className="relative max-w-lg w-full">
        {/* Main Success Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-500/30 overflow-hidden">
          {/* Header Section with Celebration */}
          <div className="relative p-8 text-center bg-gradient-to-b from-green-500/10 to-transparent">
            <div className="absolute top-4 left-4">
              <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                <Sparkles className="w-5 h-5 text-green-400" />
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500 rounded-full blur-3xl opacity-40 animate-pulse" />
                <div className="relative bg-gray-800 p-5 rounded-2xl border-2 border-green-500/50 shadow-lg">
                  <CheckCircle className="w-16 h-16 text-green-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  Payment Successful!
                </h1>
                <p className="text-gray-400 text-lg">
                  Your order has been confirmed
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-6">
            {/* Order Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                ORDER SUMMARY
              </div>

              <div className="bg-gray-800/50 border border-green-500/20 rounded-2xl p-5 space-y-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm">Order ID</p>
                    <p className="font-mono text-green-300 text-sm font-medium break-all">
                      {orderId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm">Payment ID</p>
                    <p className="font-mono text-green-300 text-sm font-medium break-all">
                      {paymentId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm">Order Date</p>
                    <p className="text-white text-sm font-medium">
                      {orderDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                WHAT&apos;S NEXT
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    icon: Mail,
                    text: "Confirmation email sent",
                    subtext: "Check your inbox",
                  },
                  {
                    icon: Package,
                    text: "Order processing",
                    subtext: "We'll notify you when shipped",
                  },
                  {
                    icon: Download,
                    text: "Download invoice",
                    subtext: "Available in your orders",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl border border-green-500/10"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        {step.text}
                      </p>
                      <p className="text-gray-500 text-xs">{step.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-3 p-4 bg-gray-800/30 rounded-2xl border border-gray-600/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
              <span className="text-gray-400 text-sm">
                Redirecting to home in{" "}
                <span className="text-green-400 font-bold">{countdown}</span>{" "}
                seconds...
              </span>
            </div>

            {/* Support Info */}
            <div className="text-center p-4 bg-gray-800/20 rounded-2xl border border-gray-600/20">
              <p className="text-gray-500 text-sm mb-2">
                Questions about your order?
              </p>
              <a
                href="mailto:support@dummyshop.com"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-medium text-sm"
              >
                <Mail className="w-4 h-4" />
                support@dummyshop.com
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                href="/"
                className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-2xl hover:from-green-400 hover:to-emerald-500 transition-all transform hover:scale-105 shadow-2xl shadow-green-500/25"
              >
                <Home className="w-5 h-5" />
                Continue Shopping
              </Link>

              <Link
                href="/orders"
                className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gray-800/50 backdrop-blur-xl border border-green-500/30 text-green-400 font-medium rounded-2xl hover:bg-gray-700/50 hover:border-green-400/50 transition-all transform hover:scale-105"
              >
                <Package className="w-5 h-5" />
                Track Order
              </Link>
            </div>

            {/* Quick Download Option */}
            <button className="w-full flex items-center justify-center gap-2 py-3 text-gray-500 hover:text-green-400 transition-colors text-sm border border-gray-600/30 rounded-xl hover:border-green-500/30">
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
          </div>
        </div>

        {/* Success Celebration Message */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-green-500/20">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-gray-400 text-sm">
              Thank you for your purchase! 🎉
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}