// src/app/payment/failed/page.tsx
"use client"
import {use} from "react";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentFailed({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = use(searchParams);
  const router = useRouter();
  const reason = (params?.reason || "unknown_error").replace(/_/g, " ");
  const error = params?.error ? decodeURIComponent(params.error) : null;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-black pointer-events-none" />

      <div className="relative max-w-md w-full bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6 border border-green-500/20">
        {/* Neon Glow Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gray-800 p-4 rounded-full border border-green-500/50">
              <AlertCircle className="w-12 h-12 text-green-400" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
              Payment Failed
            </h1>
            <p className="mt-2 text-gray-400 text-sm">
              Something went wrong with your transaction.
            </p>
          </div>
        </div>

        {/* Error Card */}
        <div className="bg-gray-800/50 border border-green-500/30 rounded-xl p-5 space-y-3 text-left backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-medium text-sm">Reason:</span>
            <span className="text-gray-200 capitalize">{reason}</span>
          </div>
          {error && (
            <div className="flex items-start gap-2 text-sm">
              <span className="text-green-400 font-medium">Details:</span>
              <span className="text-gray-300 break-words">{error}</span>
            </div>
          )}
        </div>

        {/* Support */}
        <p className="text-xs text-gray-500 text-center">
          Need help?{" "}
          <a
            href="mailto:support@yourcompany.com"
            className="text-green-400 underline hover:no-underline transition"
          >
            support@yourcompany.com
          </a>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => router.back()}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition transform hover:scale-105 shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-green-500/50 text-green-400 font-medium rounded-xl hover:bg-green-500/10 transition backdrop-blur-sm"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}