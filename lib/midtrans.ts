import midtransClient from "midtrans-client";

/**
 * Midtrans Snap client (server-side only).
 * Used to create transaction tokens consumed by Snap.js on the client.
 */
export const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY ?? "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "",
});

/** Core API client — for status checks, refunds, notifications. */
export const core = new midtransClient.CoreApi({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY ?? "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "",
});

export interface MidtransItem {
  id: string;
  price: number;
  quantity: number;
  name: string;
}

export interface CreateTransactionParams {
  orderId: string;
  grossAmount: number;
  items: MidtransItem[];
  customer: {
    firstName: string;
    email: string;
    phone: string;
  };
}

/** Create a Snap transaction and return the token + redirect URL. */
export async function createSnapTransaction(params: CreateTransactionParams) {
  const { orderId, grossAmount, items, customer } = params;

  return snap.createTransaction({
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
    item_details: items.map((i) => ({
      id: i.id,
      price: Math.round(i.price),
      quantity: i.quantity,
      name: i.name.slice(0, 50), // Midtrans caps name length
    })),
    customer_details: {
      first_name: customer.firstName,
      email: customer.email,
      phone: customer.phone,
    },
    credit_card: { secure: true },
  }) as Promise<{ token: string; redirect_url: string }>;
}
