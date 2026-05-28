"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function CreateInvitationPage() {
  const router = useRouter();

  const [brideName, setBrideName] = useState("");
  const [groomName, setGroomName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venueName, setVenueName] = useState("");
  const [slug, setSlug] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Silakan login dulu.");
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("invitations").insert({
      user_id: user.id,
      bride_name: brideName,
      groom_name: groomName,
      event_date: eventDate,
      venue_name: venueName,
      slug: slug,
      status: "free",
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Undangan berhasil dibuat.");
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Buat Undangan Baru</h1>

        <form onSubmit={handleCreate} className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-lg bg-white text-black"
            placeholder="Nama mempelai wanita"
            value={brideName}
            onChange={(e) => setBrideName(e.target.value)}
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-white text-black"
            placeholder="Nama mempelai pria"
            value={groomName}
            onChange={(e) => setGroomName(e.target.value)}
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-white text-black"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-white text-black"
            placeholder="Nama lokasi acara"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-white text-black"
            placeholder="Link undangan, contoh: randi-rani"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
          />

          <button className="w-full bg-white text-black py-3 rounded-full font-semibold">
            Simpan Undangan
          </button>
        </form>
      </div>
    </main>
  );
}