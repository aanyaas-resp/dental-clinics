"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Loader2, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CLINIC } from "@/lib/constants";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Incorrect email or password.");
      return;
    }

    const next = searchParams.get("next") || "/admin/appointments";
    router.push(next);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-sm rounded-xl2 border border-line bg-cream p-8 shadow-soft"
    >
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-forest text-cream">
          <Lock size={18} />
        </span>
        <h1 className="font-display text-2xl text-ink">Staff login</h1>
        <p className="mt-1 text-sm text-ink/55">{CLINIC.shortName} admin dashboard</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="admin-email">Email</Label>
          <Input
            id="admin-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@shriramdentalclinic.in"
          />
        </div>
        <div>
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-forest-dark disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Signing in...
            </>
          ) : (
            <>
              <LogIn size={16} /> Sign in
            </>
          )}
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-ink/40">
        Admin accounts are created in the Supabase dashboard, not here.
      </p>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="bg-sand pb-24 pt-32 sm:pt-40">
      <Container>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </Container>
    </div>
  );
}
