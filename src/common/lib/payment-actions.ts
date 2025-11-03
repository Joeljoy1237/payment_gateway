"use server";

import Razorpay from "razorpay";


export async function createOrder(amount: number) {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        return { orderId: order.id };
    } catch (error) {
        console.error("Order creation failed:", error);
        throw new Error("Order creation failed");
    }
}

export interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    [key: string]: unknown;
}

export async function verifyPayment(paymentResponse: RazorpayPaymentResponse) {
    const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const verifyRes = await fetch(`${baseUrl}/api/razorpay/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentResponse),
    });

    const verifyData = await verifyRes.json();
    return verifyData;
}
