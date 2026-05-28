"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CreateInvitationPage() {
  const router = useRouter();
  const [brideName, setBrideName] = useState("");
  const [groomName, setGroomName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [venueName, setVenueName] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [story, setStory] = useState("");
  const [slug, setSlug] = useState("");
  const [theme, setTheme] = useState("elegant");
  const [loading, setLoading] = useState(false);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Silakan login dulu.");
      router.push("/login");
      return;
    }

    const finalSlug = toSlug(slug || `${brideName}-${groomName}`);

    const { error } = await supabase.from("invitations").insert({
      user_id: user.id,
      bride_name: brideName,
      groom_name: groomName,
      event_date: eventDate,
      venue_name: venueName,
      maps_url: mapsUrl,
      story,
      slug: finalSlug,
      status: "free",
      theme,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Undangan berhasil dibuat.");
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <a href="/dashboard" className="text-white/60">← Kembali</a>
        <h1 className="text-4xl font-bold mt-6 mb-8">Buat Undangan Baru</h1>

        <form onSubmit={handleCreate} className="space-y-4">
          <input className="w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Nama mempelai wanita" value={brideName} onChange={(e) => setBrideName(e.target.value)} required />
          <input className="w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Nama mempelai pria" value={groomName} onChange={(e) => setGroomName(e.target.value)} required />
          <input className="w-full px-4 py-3 rounded-xl bg-white text-black" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
          <input className="w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Nama lokasi acara" value={venueName} onChange={(e) => setVenueName(e.target.value)} required />
          <input className="w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Link Google Maps opsional" value={mapsUrl} onChange={(e) => setMapsUrl(e.target.value)} />
          <textarea className="w-full px-4 py-3 rounded-xl bg-white text-black min-h-28" placeholder="Cerita singkat / kata pembuka opsional" value={story} onChange={(e) => setStory(e.target.value)} />
          <input className="w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Slug, contoh: ran-cici" value={slug} onChange={(e) => setSlug(toSlug(e.target.value))} required />

          <select className="w-full px-4 py-3 rounded-xl bg-white text-black" value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="elegant">Elegant Dark</option>
            <option value="floral">Floral Pink</option>
            <option value="islamic">Islamic Gold</option>
            <option value="luxury">Luxury Black</option>
          </select>

          <button disabled={loading} className="w-full bg-white text-black py-3 rounded-full font-semibold disabled:opacity-60">
            {loading ? "Menyimpan..." : "Simpan Undangan"}
          </button>
        </form>
      </div>
    </main>
  );
}
