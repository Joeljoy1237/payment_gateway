import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    // 1️⃣ Verify webhook authenticity
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(rawBody)
        .digest("hex");

    if (expectedSignature !== signature) {
        console.error("Invalid webhook signature");
        return NextResponse.json({ success: false }, { status: 400 });
    }

    // 2️⃣ Parse and handle the event
    const event = JSON.parse(rawBody);
    console.log("Webhook event received:", event.payload.payment.entity.notes);


    switch (event.event) {
        case "payment.captured":
            const payment = event.payload.payment.entity;
            // Example: update your DB order to "paid"
            console.log("✅ Payment captured:", payment.id);
            break;

        case "payment.failed":
            const failed = event.payload.payment.entity;
            console.log("❌ Payment failed:", failed.id);
            break;

        case "refund.processed":
            const refund = event.payload.refund.entity;
            console.log("🔄 Refund processed:", refund.id);
            break;

        default:
            console.log("Unhandled webhook:", event.event);
    }

    return NextResponse.json({ success: true });
}
