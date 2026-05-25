export interface CartItem {
  /** Composite key: `${productId}:${variantId}` — unique per size. */
  key: string;
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  size: string;
  price: number;
  comparePrice?: number | null;
  image: string;
  quantity: number;
  maxStock: number;
}

export interface CartSummary {
  subtotal: number;
  itemCount: number;
  freeShippingThreshold: number;
  qualifiesForFreeShipping: boolean;
  remainingForFreeShipping: number;
}
