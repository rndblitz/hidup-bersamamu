"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function InvitationPage() {
  const params = useParams();
  const slug = String(params.slug);

  const [invitation, setInvitation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInvitation() {
      const { data, error } = await supabase
        .from("invitations")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        alert(error.message);
      }

      setInvitation(data);
      setLoading(false);
    }

    loadInvitation();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </main>
    );
  }

  if (!invitation) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Undangan tidak ditemukan</h1>
      </main>
    );
  }

  if (invitation.status !== "premium") {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-4xl font-bold mb-4">
          Undangan Belum Aktif
        </h1>
        <p className="text-white/70">
          Pemilik undangan belum mengaktifkan paket premium.
        </p>
      </div>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-pink-400 uppercase tracking-[0.3em] mb-4">
          The Wedding Of
        </p>

        <h1 className="text-6xl font-bold mb-6">
          {invitation.bride_name} & {invitation.groom_name}
        </h1>

        <p className="text-xl text-white/70 mb-4">
          📅 {invitation.event_date}
        </p>

        <p className="text-xl text-white/70 mb-10">
          📍 {invitation.venue_name}
        </p>
      </div>
    </main>
  );
}