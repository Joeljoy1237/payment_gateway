// src/common/components/RefundButton.tsx
"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { toast } from "react-hot-toast";
import { createRefund } from "@/common/lib/razorpayHelper";

interface RefundButtonProps {
  orderId: string;
  amount: number; // in paise
  status: string;
  className?: string;
}

export default function RefundButton({
  orderId,
  amount,
  status,
  className = "",
}: RefundButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const canRefund = status === "paid";

  const handleRefund = async () => {
    if (!canRefund) return;

    const reason = window.prompt("Reason for refund (optional):")?.trim();
    if (!reason) {
      toast.error("Please provide a refund reason.");
      return;
    }

    const confirm = window.confirm(
      `Refund ₹${amount / 100} for order ${orderId}?`
    );
    if (!confirm) return;

    setIsLoading(true);
    try {
      await createRefund(orderId, amount, { reason });
      toast.success(`Refund requested for ${orderId}`);
    } catch (err: unknown) {
      toast.error((err as Error)?.message || "Refund failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!canRefund) return null;

  return (
    <button
      onClick={handleRefund}
      disabled={isLoading}
      className={`
        flex items-center gap-1.5 px-2 py-1 rounded-lg
        text-orange-400 hover:text-orange-300
        disabled:text-orange-600 disabled:cursor-not-allowed
        font-medium text-sm transition-all
        hover:bg-orange-500/10
        ${isLoading ? "animate-pulse" : ""}
        ${className}
      `}
      title="Request refund"
    >
      <RotateCcw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
      {isLoading ? "Processing..." : "Refund"}
    </button>
  );
}