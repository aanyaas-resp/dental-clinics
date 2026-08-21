"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { CLINIC } from "@/lib/constants";

export function AdminHeader() {
  const router = useRouter();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setSignedIn(!!data.user));
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-line bg-cream">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/admin/appointments" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-cream">
            <span className="font-display text-sm">S</span>
          </span>
          <span className="text-sm font-semibold text-ink">
            {CLINIC.shortName} — Admin
          </span>
        </Link>

        {signedIn && (
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink/70 transition-colors hover:border-forest/40 hover:text-forest"
          >
            <LogOut size={14} /> Sign out
          </button>
        )}
      </div>
    </header>
  );
}
