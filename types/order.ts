import type { CartItem } from "./cart";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  notes?: string;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId?: string | null;
  email: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentId?: string | null;
  shippingAddress: ShippingAddress;
  createdAt: string;
}

/** Payload sent from checkout to the order/payment API. */
export interface CheckoutPayload {
  email: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  promoCode?: string;
}
