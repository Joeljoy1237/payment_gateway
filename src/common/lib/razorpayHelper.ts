"use server"
import Razorpay from "razorpay";
import { RazorpayOrder, RazorpayPayment } from "../types/razorpay";

if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials missing in environment variables");
}

// Create a Razorpay client instance (only once per server runtime)
const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Fetch all Razorpay orders
 * 
 */

export type ExtendedOrderStatus =
    | "created"
    | "attempted"
    | "paid"
    | "refunded"
    | "failed"
    | "pending";

export type ExtendedOrder = Omit<RazorpayOrder, "status"> & {
    status: ExtendedOrderStatus;
    payments?: RazorpayPayment[];
};

export async function getAllOrders(limit = 10) {
    try {
        const { items: orders } = await razorpay.orders.all({ count: limit });

        const enrichedOrders = await Promise.all(
            orders.map(async (order) => {
                const { items: payments } = await razorpay.orders.fetchPayments(order.id);

                let computedStatus: ExtendedOrderStatus = order.status as ExtendedOrderStatus;

                if (payments.length > 0) {
                    const payment = payments[0]; // Razorpay orders rarely have >1 payment

                    if (payment.status === "captured") {
                        computedStatus = "paid";
                    } else if (payment.status === "refunded" || payment.refund_status === "full") {
                        computedStatus = "refunded";
                    } else if (payment.status === "failed") {
                        computedStatus = "failed";
                    } else if (payment.status === "authorized") {
                        computedStatus = "pending";
                    }
                }

                return {
                    ...order,
                    payments,
                    status: computedStatus,
                };
            })
        );

        return enrichedOrders;
    } catch (error: unknown) {
        console.error("Error fetching Razorpay orders:", error);
        throw new Error((error as Error).message || "Failed to fetch orders");
    }
}

/**
 * Fetch a specific order by ID
 */
export async function getOrderById(orderId: string) {
    try {
        const order = await razorpay.orders.fetch(orderId);
        return order;
    } catch (error: unknown) {
        console.error("Error fetching order:", error);
        throw new Error((error as Error).message || "Failed to fetch order");
    }
}

/**
 * Fetch all payments associated with a specific order
 */
export async function getPaymentsForOrder(orderId: string) {
    try {
        const payments = await razorpay.orders.fetchPayments(orderId);
        return payments.items;
    } catch (error: unknown) {
        console.error("Error fetching order payments:", error);
        throw new Error((error as Error).message || "Failed to fetch order payments");
    }
}


// Refund Section
/**
 * Create a refund for a specific payment
 * @param paymentId - Razorpay payment ID (e.g., "pay_abc123xyz")
 * @param amount - Optional refund amount (in INR)
 * @param notes - Optional notes (e.g., reason, reference)
 */

export async function createRefund(
    orderId: string,
    amount?: number,
    notes?: Record<string, string>
) {
    try {
        const options: { speed: "optimum" | "normal"; amount?: number; notes?: Record<string, string> } = {
            speed: "optimum", // 'optimum' or 'instant'
        };
        const payments = await razorpay.orders.fetchPayments(orderId);
        if (payments.items.length === 0) {
            throw new Error("No payments found for this order");
        }
        const paymentId = payments.items[0].id;

        if (amount) options.amount = amount * 100; // convert to paise
        if (notes) options.notes = notes;

        const refund = await razorpay.payments.refund(paymentId, options);

        return refund;
    } catch (error: unknown) {
        console.error("Refund failed:", error);
        throw new Error((error as Error).message || "Failed to create refund");
    }
}

/**
 * Fetch refund details by refund ID
 */
export async function getRefundById(refundId: string) {
    try {
        const refund = await razorpay.refunds.fetch(refundId);
        return refund;
    } catch (error: unknown) {
        console.error("Error fetching refund:", error);
        throw new Error((error as Error).message || "Failed to fetch refund");
    }
}

/**
 * Get all refunds for a specific payment
 */
// export async function getRefundsForPayment(paymentId: string, refundId: string) {
//     try {
//         const refunds = await razorpay.payments.fetchRefund(paymentId, refundId);
//         return refunds;
//     } catch (error: unknown) {
//         console.error("Error fetching payment refunds:", error);
//         throw new Error((error as Error).message || "Failed to fetch payment refunds");
//     }
// }