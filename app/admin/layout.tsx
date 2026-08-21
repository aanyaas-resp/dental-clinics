import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand">
      <AdminHeader />
      <main className="pb-20 pt-8">{children}</main>
    </div>
  );
}
