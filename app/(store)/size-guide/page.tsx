import type { Metadata } from "next";
import { PageHeader } from "@/components/shop/PageHeader";

export const metadata: Metadata = {
  title: "Size Guide",
  description: "Garment measurements for LUXAFOIR tops and bottoms, in centimetres.",
};

const TABLES = [
  {
    title: "Tops — T-Shirt, Long Sleeve & Hoodie",
    headers: ["Size", "Chest", "Length", "Shoulder"],
    rows: [
      ["XS", 102, 66, 46],
      ["S", 108, 69, 48],
      ["M", 114, 72, 50],
      ["L", 120, 74, 52],
      ["XL", 126, 76, 54],
    ],
  },
  {
    title: "Bottoms — Pants & Shorts",
    headers: ["Size", "Waist", "Hip", "Inseam"],
    rows: [
      ["XS", 74, 96, 74],
      ["S", 78, 100, 75],
      ["M", 84, 106, 76],
      ["L", 90, 112, 77],
      ["XL", 96, 118, 78],
    ],
  },
];

export default function SizeGuidePage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Fit"
        title="Size Guide"
        description="All measurements in centimetres. Our pieces run oversized — size down for a regular fit."
      />
      <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-12 px-site">
        {TABLES.map((t) => (
          <section key={t.title}>
            <h2 className="mb-5 text-label uppercase tracking-label text-gold">{t.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-ash">
                    {t.headers.map((h) => (
                      <th key={h} className="py-3 pr-4 text-label uppercase tracking-label text-smoke">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((row) => (
                    <tr key={String(row[0])} className="border-b border-ash/60">
                      {row.map((cell, i) => (
                        <td
                          key={i}
                          className={`py-3 pr-4 font-mono text-sm ${
                            i === 0 ? "text-gold" : "text-[#0A0A0A]"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
