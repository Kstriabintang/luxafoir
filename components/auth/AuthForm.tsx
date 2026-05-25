"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

const inputCls =
  "w-full border border-ash bg-transparent px-4 py-3 font-body text-body text-ivory placeholder:text-smoke transition-colors focus:border-gold focus:outline-none";

const authConfigured = () => !!process.env.NEXT_PUBLIC_SUPABASE_URL;

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const isLogin = mode === "login";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!authConfigured()) {
        // Demo mode: no Supabase project wired.
        await new Promise((r) => setTimeout(r, 500));
        toast.success(isLogin ? "Signed in (demo)" : "Account created (demo)");
        router.push("/account");
        return;
      }

      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        toast.success("Welcome back");
        router.push("/account");
      } else {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { full_name: form.name } },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center font-display text-3xl font-light text-ivory">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h1>
      <p className="mt-2 text-center text-body text-smoke">
        {isLogin ? "Sign in to your LUXAFOIR account." : "Join LUXAFOIR — crafted for the distinct."}
      </p>

      <form onSubmit={submit} className="mt-10 flex flex-col gap-4">
        {!isLogin && (
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputCls}
            placeholder="Full name"
          />
        )}
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className={inputCls}
          placeholder="Email address"
        />
        <input
          required
          type="password"
          minLength={6}
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          className={inputCls}
          placeholder="Password"
        />

        <Button type="submit" variant="solid" size="full" loading={loading} className="mt-2">
          {isLogin ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <p className="mt-8 text-center text-caption text-smoke">
        {isLogin ? "New to LUXAFOIR? " : "Already have an account? "}
        <Link
          href={isLogin ? "/register" : "/login"}
          className="text-gold underline-offset-4 hover:underline"
        >
          {isLogin ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}
