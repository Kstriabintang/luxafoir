"use client";

import { Modal } from "@/components/ui/Modal";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
  category?: string;
}

// Measurements in centimetres. Indexed by a normalised category name.
const SIZE_TABLES: Record<string, { headers: string[]; rows: (string | number)[][] }> = {
  default: {
    headers: ["Size", "Chest", "Waist", "Length"],
    rows: [
      ["XS", 96, 80, 68],
      ["S", 100, 84, 70],
      ["M", 106, 90, 72],
      ["L", 112, 96, 74],
      ["XL", 118, 102, 76],
    ],
  },
  Bottoms: {
    headers: ["Size", "Waist", "Hip", "Inseam"],
    rows: [
      ["XS", 74, 92, 76],
      ["S", 78, 96, 77],
      ["M", 84, 102, 78],
      ["L", 90, 108, 79],
      ["XL", 96, 114, 80],
    ],
  },
};

export function SizeGuideModal({ open, onClose, category }: SizeGuideModalProps) {
  const table = (category && SIZE_TABLES[category]) || SIZE_TABLES.default;

  return (
    <Modal open={open} onClose={onClose} label="Size guide" className="max-w-xl">
      <div className="p-8 md:p-10">
        <p className="text-label uppercase tracking-label text-gold">Size Guide</p>
        <h2 className="mt-3 font-display text-3xl font-light text-ivory">
          {category ? `${category} Measurements` : "Measurements"}
        </h2>
        <p className="mt-3 text-caption text-smoke">
          All measurements in centimetres. For the best fit, compare against a garment you
          already own.
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ash">
                {table.headers.map((h) => (
                  <th
                    key={h}
                    className="py-3 pr-4 text-label uppercase tracking-label text-mist"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={String(row[0])} className="border-b border-ash/60">
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={`py-3 pr-4 font-mono text-sm ${
                        i === 0 ? "text-gold" : "text-ivory"
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
      </div>
    </Modal>
  );
}
