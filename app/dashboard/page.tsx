"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Invitation {
  id: string;
  bride_name: string;
  groom_name: string;
  event_date: string;
  venue_name: string;
  slug: string;
  status: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email || "");

      const { data } = await supabase
        .from("invitations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        setInvitations(data);
      }
    }

    loadData();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Dashboard Member
        </h1>

        <p className="text-white/70 mb-8">
          Login sebagai: {email}
        </p>

        <div className="flex gap-4 mb-10">
          <a
            href="/dashboard/create"
            className="bg-white text-black px-6 py-3 rounded-full font-semibold"
          >
            Buat Undangan Baru
          </a>

          <button
            onClick={handleLogout}
            className="border border-white px-6 py-3 rounded-full font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6">
          {invitations.map((item) => (
            <div
              key={item.id}
              className="border border-white/20 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold mb-2">
                {item.bride_name} & {item.groom_name}
              </h2>

              <p className="text-white/70 mb-2">
                📅 {item.event_date}
              </p>

              <p className="text-white/70 mb-4">
                📍 {item.venue_name}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-pink-400">
                  /{item.slug}
                </span>

                <span className="bg-white text-black px-4 py-1 rounded-full text-sm">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}