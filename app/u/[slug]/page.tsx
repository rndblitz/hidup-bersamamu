"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import DynamicInvitationTheme, { Invitation } from "@/components/themes/DynamicInvitationTheme";

interface RsvpItem {
  id: string;
  guest_name: string;
  attendance: string;
  message: string | null;
  created_at: string;
}

export default function InvitationPage() {
  const params = useParams();
  const slugParam = params.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [rsvps, setRsvps] = useState<RsvpItem[]>([]);
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("Hadir");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadRsvps(invitationId: string) {
    const { data } = await supabase
      .from("rsvps")
      .select("*")
      .eq("invitation_id", invitationId)
      .order("created_at", { ascending: false });

    if (data) setRsvps(data as RsvpItem[]);
  }

  useEffect(() => {
    async function loadInvitation() {
      const { data, error } = await supabase
        .from("invitations")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) alert(error.message);

      setInvitation(data as Invitation | null);
      setLoading(false);

      if (data?.id) await loadRsvps(data.id);
    }

    if (slug) loadInvitation();
  }, [slug]);

  async function handleRsvp(e: React.FormEvent) {
    e.preventDefault();

    if (!invitation) return;

    const { error } = await supabase.from("rsvps").insert({
      invitation_id: invitation.id,
      guest_name: guestName,
      attendance,
      message,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setGuestName("");
    setAttendance("Hadir");
    setMessage("");
    await loadRsvps(invitation.id);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </main>
    );
  }

  if (!invitation) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Undangan tidak ditemukan</h1>
          <p className="text-white/60">Pastikan link undangan sudah benar.</p>
        </div>
      </main>
    );
  }

  if (invitation.status !== "premium") {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-bold mb-4">Undangan Belum Aktif</h1>
          <p className="text-white/70 mb-8">Pemilik undangan belum mengaktifkan paket premium.</p>
          <a href="/login" className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold">
            Login Member
          </a>
        </div>
      </main>
    );
  }

  const rsvpForm = (
    <form onSubmit={handleRsvp} className="grid gap-4 max-w-2xl mx-auto">
      <input className="w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Nama tamu" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
      <select className="w-full px-4 py-3 rounded-xl bg-white text-black" value={attendance} onChange={(e) => setAttendance(e.target.value)}>
        <option value="Hadir">Hadir</option>
        <option value="Tidak Hadir">Tidak Hadir</option>
        <option value="Masih Ragu">Masih Ragu</option>
      </select>
      <textarea className="w-full px-4 py-3 rounded-xl bg-white text-black min-h-28" placeholder="Ucapan dan doa" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button className="bg-white text-black px-8 py-4 rounded-full font-semibold">Kirim RSVP</button>
    </form>
  );

  return <DynamicInvitationTheme invitation={invitation} rsvps={rsvps} rsvpForm={rsvpForm} />;
}
