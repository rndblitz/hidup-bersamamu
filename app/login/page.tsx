"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md border border-white/20 rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold mb-6">Login Member</h1>

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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-white text-black py-3 rounded-full font-semibold">
          Login
        </button>
      </form>
    </main>
  );
}