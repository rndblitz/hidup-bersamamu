"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

interface InvitationForm {
  bride_name: string;
  groom_name: string;
  event_date: string;
  venue_name: string;
  maps_url: string;
  story: string;
  slug: string;
  theme: string;
  status: string;
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function EditInvitationPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  const [form, setForm] = useState<InvitationForm>({
    bride_name: "",
    groom_name: "",
    event_date: "",
    venue_name: "",
    maps_url: "",
    story: "",
    slug: "",
    theme: "elegant",
    status: "free",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInvitation() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("invitations")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (error) {
        alert(error.message);
        router.push("/dashboard");
        return;
      }

      setForm({
        bride_name: data.bride_name || "",
        groom_name: data.groom_name || "",
        event_date: data.event_date || "",
        venue_name: data.venue_name || "",
        maps_url: data.maps_url || "",
        story: data.story || "",
        slug: data.slug || "",
        theme: data.theme || "elegant",
        status: data.status || "free",
      });
      setLoading(false);
    }

    if (id) loadInvitation();
  }, [id, router]);

  function updateField(field: keyof InvitationForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("invitations")
      .update({ ...form, slug: toSlug(form.slug) })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Undangan berhasil diperbarui.");
    router.push("/dashboard");
  }

  if (loading) return <main className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</main>;

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <a href="/dashboard" className="text-white/60">← Kembali</a>
        <h1 className="text-4xl font-bold mt-6 mb-8">Edit Undangan</h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input className="w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Nama mempelai wanita" value={form.bride_name} onChange={(e) => updateField("bride_name", e.target.value)} required />
          <input className="w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Nama mempelai pria" value={form.groom_name} onChange={(e) => updateField("groom_name", e.target.value)} required />
          <input className="w-full px-4 py-3 rounded-xl bg-white text-black" type="date" value={form.event_date} onChange={(e) => updateField("event_date", e.target.value)} required />
          <input className="w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Nama lokasi acara" value={form.venue_name} onChange={(e) => updateField("venue_name", e.target.value)} required />
          <input className="w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Link Google Maps opsional" value={form.maps_url} onChange={(e) => updateField("maps_url", e.target.value)} />
          <textarea className="w-full px-4 py-3 rounded-xl bg-white text-black min-h-28" placeholder="Cerita singkat" value={form.story} onChange={(e) => updateField("story", e.target.value)} />
          <input className="w-full px-4 py-3 rounded-xl bg-white text-black" placeholder="Slug" value={form.slug} onChange={(e) => updateField("slug", toSlug(e.target.value))} required />

          <select className="w-full px-4 py-3 rounded-xl bg-white text-black" value={form.theme} onChange={(e) => updateField("theme", e.target.value)}>
            <option value="elegant">Elegant Dark</option>
            <option value="floral">Floral Pink</option>
            <option value="islamic">Islamic Gold</option>
            <option value="luxury">Luxury Black</option>
          </select>

          <select className="w-full px-4 py-3 rounded-xl bg-white text-black" value={form.status} onChange={(e) => updateField("status", e.target.value)}>
            <option value="free">Free / Belum Aktif</option>
            <option value="premium">Premium / Aktif</option>
          </select>

          <button className="w-full bg-white text-black py-3 rounded-full font-semibold">Simpan Perubahan</button>
        </form>
      </div>
    </main>
  );
}
