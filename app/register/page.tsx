"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Akun berhasil dibuat. Silakan login.");
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <form onSubmit={handleRegister} className="w-full max-w-md border border-white/20 rounded-3xl p-8 bg-white/5">
        <h1 className="text-3xl font-bold mb-2">Daftar Member</h1>
        <p className="text-white/60 mb-8">Mulai buat undangan digital gratis.</p>

        <input className="w-full mb-4 px-4 py-3 rounded-xl bg-white text-black placeholder-gray-500" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full mb-6 px-4 py-3 rounded-xl bg-white text-black placeholder-gray-500" type="password" placeholder="Password minimal 6 karakter" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />

        <button disabled={loading} className="w-full bg-white text-black py-3 rounded-full font-semibold disabled:opacity-60">
          {loading ? "Memproses..." : "Buat Akun"}
        </button>

        <p className="text-center text-white/60 mt-6">
          Sudah punya akun? <a href="/login" className="text-amber-200">Login</a>
        </p>
      </form>
    </main>
  );
}
