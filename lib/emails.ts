import { resend, FROM_EMAIL } from "./resend";
import { OrderConfirmationEmail } from "@/emails/OrderConfirmation";

interface SendOrderConfirmationParams {
  orderId: string;
  email: string;
  items: { name: string; size: string; quantity: number; price: number }[];
  total: number;
  shippingCost: number;
}

/** Send the order confirmation email via Resend + React Email. */
export async function sendOrderConfirmation({
  orderId,
  email,
  items,
  total,
  shippingCost,
}: SendOrderConfirmationParams) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Your LUXAFOIR order ${orderId} is confirmed`,
    react: OrderConfirmationEmail({ orderId, items, total, shippingCost }),
  });
}
