"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

const inputCls =
  "w-full border border-ash bg-transparent px-4 py-3 font-body text-body text-ivory placeholder:text-smoke transition-colors focus:border-gold focus:outline-none";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [marketing, setMarketing] = useState(true);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    toast.success("Settings saved");
  };

  return (
    <div>
      <h2 className="font-display text-3xl font-light text-ivory">Settings</h2>
      <p className="mt-2 text-body text-mist">Manage your profile and preferences.</p>

      <form onSubmit={save} className="mt-10 flex max-w-lg flex-col gap-6">
        <label className="block">
          <span className="mb-2 block text-label uppercase tracking-label text-mist">Full Name</span>
          <input className={inputCls} placeholder="Your name" defaultValue="" />
        </label>
        <label className="block">
          <span className="mb-2 block text-label uppercase tracking-label text-mist">Email</span>
          <input type="email" className={inputCls} placeholder="you@email.com" defaultValue="" />
        </label>
        <label className="block">
          <span className="mb-2 block text-label uppercase tracking-label text-mist">Phone</span>
          <input className={inputCls} placeholder="+62 …" defaultValue="" />
        </label>

        <button
          type="button"
          onClick={() => setMarketing((m) => !m)}
          className="flex items-center justify-between border border-ash px-4 py-4 text-left"
        >
          <span>
            <span className="block text-body text-ivory">Marketing emails</span>
            <span className="block text-caption text-smoke">New collections, private sales, stories.</span>
          </span>
          <span
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              marketing ? "bg-gold" : "bg-ash"
            }`}
          >
            <span
              className={`absolute top-0.5 size-5 rounded-full bg-obsidian transition-transform ${
                marketing ? "translate-x-[22px]" : "translate-x-0.5"
              }`}
            />
          </span>
        </button>

        <Button type="submit" variant="solid" size="lg" loading={saving} className="self-start">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
