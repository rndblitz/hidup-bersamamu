"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Akun berhasil dibuat. Silakan login.");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <form onSubmit={handleRegister} className="w-full max-w-md border border-white/20 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">Daftar Member</h1>

        <input
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white text-black placeholder-gray-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-6 px-4 py-3 rounded-lg bg-white text-black placeholder-gray-500"
          type="password"
          placeholder="Password minimal 6 karakter"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-white text-black py-3 rounded-full font-semibold">
          Buat Akun
        </button>
      </form>
    </main>
  );
}