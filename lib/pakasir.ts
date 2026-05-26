/**
 * Pakasir payment — client-safe shared config (NO secrets here).
 * The API key lives only in the server route handlers (process.env on Vercel).
 */

export type PakasirMethodType = "qris" | "va";

export interface PakasirMethod {
  /** API value sent to Pakasir (e.g. "qris", "bni_va"). */
  value: string;
  label: string;
  type: PakasirMethodType;
}

/** Methods offered at checkout (subset of Pakasir's catalogue). */
export const PAKASIR_METHODS: PakasirMethod[] = [
  { value: "qris", label: "QRIS", type: "qris" },
  { value: "bni_va", label: "BNI Virtual Account", type: "va" },
  { value: "bri_va", label: "BRI Virtual Account", type: "va" },
  { value: "cimb_niaga_va", label: "CIMB Niaga Virtual Account", type: "va" },
  { value: "permata_va", label: "Permata Virtual Account", type: "va" },
  { value: "maybank_va", label: "Maybank Virtual Account", type: "va" },
];

/** True when running against the Pakasir sandbox (enables the simulate button). */
export const PAKASIR_SANDBOX = process.env.NEXT_PUBLIC_PAKASIR_MODE !== "production";

export interface PakasirPayment {
  project: string;
  order_id: string;
  amount: number;
  fee: number;
  total_payment: number;
  payment_method: string;
  payment_number: string;
  expired_at: string;
}

export type PakasirStatus = "pending" | "completed" | "canceled" | "expired" | string;
