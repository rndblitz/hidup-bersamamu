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
  theme: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email || "");

      const { data, error } = await supabase
        .from("invitations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) alert(error.message);
      if (data) setInvitations(data as Invitation[]);
      setLoading(false);
    }

    loadData();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return <main className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Dashboard Member</h1>
            <p className="text-white/60">Login sebagai: {email}</p>
          </div>
          <div className="flex gap-3">
            <a href="/dashboard/create" className="bg-white text-black px-6 py-3 rounded-full font-semibold">Buat Undangan</a>
            <button onClick={handleLogout} className="border border-white/40 px-6 py-3 rounded-full font-semibold">Logout</button>
          </div>
        </div>

        {invitations.length === 0 ? (
          <div className="border border-white/10 rounded-3xl p-10 text-center bg-white/5">
            <h2 className="text-2xl font-bold mb-3">Belum ada undangan</h2>
            <p className="text-white/60 mb-6">Buat undangan pertamamu sekarang.</p>
            <a href="/dashboard/create" className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold">Buat Undangan Baru</a>
          </div>
        ) : (
          <div className="grid gap-6">
            {invitations.map((item) => (
              <div key={item.id} className="border border-white/10 rounded-3xl p-6 bg-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{item.bride_name} & {item.groom_name}</h2>
                    <p className="text-white/60">📅 {item.event_date}</p>
                    <p className="text-white/60">📍 {item.venue_name}</p>
                    <p className="text-white/60">🎨 Tema: {item.theme || "elegant"}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${item.status === "premium" ? "bg-emerald-300 text-black" : "bg-amber-200 text-black"}`}>
                      {item.status}
                    </span>
                    <a href={`/u/${item.slug}`} target="_blank" className="border border-white/30 px-5 py-3 rounded-full text-center">Lihat</a>
                    <a href={`/dashboard/invitation/${item.id}/edit`} className="bg-white text-black px-5 py-3 rounded-full text-center font-semibold">Edit</a>
                  </div>
                </div>
                <p className="mt-5 text-pink-300 break-all">/u/{item.slug}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
