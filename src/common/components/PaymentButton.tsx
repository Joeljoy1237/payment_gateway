// app/payment/PaymentButton.tsx
"use client";

import { useState } from "react";
import {
  createOrder,
  verifyPayment,
  RazorpayPaymentResponse,
} from "@/common/lib/payment-actions";

interface PaymentButtonProps {
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export default function PaymentButton({
  amount,
  customerName,
  customerEmail,
  customerPhone,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create order using server action
      const orderData = await createOrder(amount);
      if (!orderData.orderId) {
        throw new Error("Order creation failed");
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: amount * 100,
        currency: "INR",
        name: "Your Company",
        description: "Test Transaction",
        order_id: orderData.orderId,
        handler: async (response: RazorpayPaymentResponse) => {
          try {
            const verifyData = await verifyPayment(response);
            if (verifyData.success) {
              // Redirect to success page
              window.location.href = `/payment/success?orderId=${orderData.orderId}&paymentId=${response.razorpay_payment_id}`;
            }
          } catch (err: unknown) {
            setError((err as Error).message || "Payment verification failed");
            window.location.href = `/payment/failed?reason=verification_error`;
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        notes: {
          order_number: "AMZ12345",
          product_id: "B0C7SGX6RC",
          category: "Mobiles",
          quantity: "1",
          seller: "Appario Retail Pvt. Ltd.",
          shipping_address: "Punnapra, Kerala, India",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
        theme: { color: "#000" },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options);
      rzp.on(
        "payment.failed",
        (response: { error: { description: string } }) => {
          window.location.href = `/payment/failed?reason=payment_failed&error=${encodeURIComponent(
            response.error.description
          )}`;
        }
      );

      rzp.open();
    } catch (err: unknown) {
      console.error(err);
      setError(
        (err as Error).message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {/* Inline error message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 underline hover:no-underline"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
