import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            // Payment verified successfully
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
        }
    } catch (err) {
        console.error("Error verifying payment:", err);
        return NextResponse.json({ error: "Verification failed" }, { status: 500 });
    }
}
