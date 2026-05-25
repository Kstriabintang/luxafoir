import { z } from "zod";

export const shippingSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(8, "Enter a valid phone number")
    .regex(/^[0-9+\-\s]+$/, "Enter a valid phone number"),
  address: z.string().min(5, "Enter your street address"),
  city: z.string().min(2, "Enter your city"),
  province: z.string().min(2, "Select your province"),
  postalCode: z.string().regex(/^[0-9]{5}$/, "Enter a 5-digit postal code"),
  notes: z.string().max(500).optional(),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;

export const newsletterSchema = z.object({
  email: z.string().email(),
});

/** Indonesian provinces for the checkout address selector. */
export const PROVINCES = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "Banten",
  "DI Yogyakarta",
  "Bali",
  "Sumatera Utara",
  "Sumatera Barat",
  "Sumatera Selatan",
  "Riau",
  "Kalimantan Timur",
  "Kalimantan Barat",
  "Sulawesi Selatan",
  "Sulawesi Utara",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Papua",
] as const;

/** Demo promo codes. */
export const PROMO_CODES: Record<string, { type: "percent" | "fixed"; value: number; label: string }> = {
  DISTINCT10: { type: "percent", value: 10, label: "10% off" },
  WELCOME50K: { type: "fixed", value: 50000, label: "Rp50.000 off" },
};
