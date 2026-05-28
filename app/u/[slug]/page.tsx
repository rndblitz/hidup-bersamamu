"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function InvitationPage() {
  const params = useParams();

  const [invitation, setInvitation] = useState<any>(null);

  useEffect(() => {
    async function loadInvitation() {
      const { data } = await supabase
        .from("invitations")
        .select("*")
        .eq("slug", params.slug)
        .single();

      setInvitation(data);
    }

    loadInvitation();
  }, [params.slug]);

  if (!invitation) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Loading...
        </h1>
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