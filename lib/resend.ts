import { Resend } from "resend";

/** Resend email client (server-side only). */
export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "LUXAFOIR <studio@luxafoir.com>";
