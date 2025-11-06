export interface RazorpayOrder {
    id: string;
    amount: number | string;
    amount_paid: number | string;
    amount_due: number | string;
    currency: string;
    receipt?: string;
    notes?: Record<string, string>;
    status: "created" | "attempted" | "paid";
    created_at: number;
}

export interface RazorpayPayment {
    id: string;
    order_id: string;
    status: "created" | "authorized" | "captured" | "refunded" | "failed";
    refund_status: "partial" | "full" | null;
    amount: number | string;
    currency: string;
}

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
