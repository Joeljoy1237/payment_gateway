"use client";

import { use } from "react";
import {
  AlertCircle,
  Home,
  RefreshCw,
  Shield,
  Mail,
  Clock,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentFailed({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = use(searchParams);
  const router = useRouter();
  const reason = (params?.reason || "unknown_error").replace(/_/g, " ");
  const error = params?.error ? decodeURIComponent(params.error) : null;
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown === 0) {
      router.back();
      return;
    }

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, router]);

  // Common error suggestions
  const getErrorSuggestions = (reason: string) => {
    const suggestions: Record<string, string[]> = {
      payment_failed: [
        "Check your card details and try again",
        "Ensure sufficient balance in your account",
        "Verify your card is enabled for online transactions",
      ],
      bank_decline: [
        "Contact your bank for transaction approval",
        "Try a different payment method",
        "Check your daily transaction limits",
      ],
      insufficient_funds: [
        "Check your account balance",
        "Try a different payment method",
        "Contact your bank for limit increases",
      ],
      network_error: [
        "Check your internet connection",
        "Wait a few moments and try again",
        "Try refreshing the page",
      ],
    };

    return (
      suggestions[reason] || [
        "Check your payment details",
        "Try a different payment method",
        "Contact your bank if issue persists",
      ]
    );
  };

  const suggestions = getErrorSuggestions(params?.reason || "");

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-purple-900/10 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      {/* Floating Particles */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-bounce" />
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-red-300 rounded-full animate-bounce delay-500" />

      <div className="relative max-w-lg w-full">
        {/* Main Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-500/30 overflow-hidden">
          {/* Header Section */}
          <div className="relative p-8 text-center bg-gradient-to-b from-red-500/10 to-transparent">
            <div className="absolute top-4 left-4">
              <div className="p-2 bg-red-500/20 rounded-lg border border-red-500/30">
                <Shield className="w-5 h-5 text-red-400" />
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-3xl opacity-40 animate-pulse" />
                <div className="relative bg-gray-800 p-5 rounded-2xl border border-red-500/50 shadow-lg">
                  <AlertCircle className="w-16 h-16 text-red-400" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Payment Failed
                </h1>
                <p className="text-gray-400 text-lg">
                  We couldn&apos;t process your payment
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-6">
            {/* Error Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-400">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                TRANSACTION DETAILS
              </div>

              <div className="bg-gray-800/50 border border-red-500/20 rounded-2xl p-5 space-y-4 backdrop-blur-sm">
                <div className="flex justify-between items-start">
                  <span className="text-red-400 font-medium">Status:</span>
                  <span className="text-white font-semibold capitalize bg-red-500/20 px-3 py-1 rounded-full text-sm">
                    {reason}
                  </span>
                </div>

                {error && (
                  <div className="space-y-2">
                    <span className="text-red-400 font-medium text-sm block">
                      Error Message:
                    </span>
                    <div className="bg-black/30 border border-red-500/10 rounded-xl p-3">
                      <p className="text-gray-200 text-sm leading-relaxed break-words">
                        {error}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Suggestions */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-400">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                QUICK FIXES
              </div>

              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl border border-orange-500/10"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <span className="text-orange-400 text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-3 p-4 bg-gray-800/30 rounded-2xl border border-gray-600/30">
              <Clock className="w-5 h-5 text-red-400" />
              <span className="text-gray-400 text-sm">
                Redirecting in{" "}
                <span className="text-red-400 font-bold">{countdown}</span>{" "}
                seconds...
              </span>
            </div>

            {/* Support Info */}
            <div className="text-center p-4 bg-gray-800/20 rounded-2xl border border-gray-600/20">
              <p className="text-gray-500 text-sm mb-2">
                Need immediate assistance?
              </p>
              <a
                href="mailto:support@dummyshop.com"
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium text-sm"
              >
                <Mail className="w-4 h-4" />
                support@dummyshop.com
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => router.back()}
                className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-black font-bold rounded-2xl hover:from-red-400 hover:to-orange-400 transition-all transform hover:scale-105 shadow-2xl shadow-red-500/25"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform" />
                Try Payment Again
              </button>

              <Link
                href="/"
                className="group flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gray-800/50 backdrop-blur-xl border border-red-500/30 text-red-400 font-medium rounded-2xl hover:bg-gray-700/50 hover:border-red-400/50 transition-all transform hover:scale-105"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </div>

            {/* Quick Back Option */}
            <button
              onClick={() => router.back()}
              className="w-full flex items-center justify-center gap-2 py-3 text-gray-500 hover:text-gray-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Or go back to previous page
            </button>
          </div>
        </div>

        {/* Security Assurance */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-xl rounded-xl border border-green-500/20">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-gray-400 text-sm">
              Your financial information is secure
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
