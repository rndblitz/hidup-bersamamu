"use client";

import { useEffect, useMemo, useState } from "react";

export interface Invitation {
  id: string;
  bride_name: string;
  groom_name: string;
  event_date: string;
  venue_name: string;
  maps_url?: string | null;
  story?: string | null;
  slug: string;
  theme?: string | null;
}

interface RsvpItem {
  id: string;
  guest_name: string;
  attendance: string;
  message: string | null;
  created_at: string;
}

const themeStyles = {
  elegant: {
    bg: "bg-[#080604]",
    section: "bg-[#120d08]",
    text: "text-white",
    muted: "text-white/65",
    accent: "text-amber-200",
    button: "bg-amber-200 text-black",
    border: "border-white/10",
    card: "bg-white/5 border-white/10",
    title: "font-serif",
    label: "The Wedding Of",
  },
  floral: {
    bg: "bg-[#fff5f7]",
    section: "bg-[#ffe4ec]",
    text: "text-pink-950",
    muted: "text-pink-800",
    accent: "text-pink-600",
    button: "bg-pink-600 text-white",
    border: "border-pink-200",
    card: "bg-white/70 border-pink-200",
    title: "font-serif text-pink-950",
    label: "Wedding Invitation",
  },
  islamic: {
    bg: "bg-[#06130d]",
    section: "bg-[#0c2418]",
    text: "text-white",
    muted: "text-white/65",
    accent: "text-emerald-200",
    button: "bg-emerald-200 text-black",
    border: "border-white/10",
    card: "bg-white/5 border-white/10",
    title: "font-serif",
    label: "Walimatul Ursy",
  },
  luxury: {
    bg: "bg-[#030303]",
    section: "bg-[#0f0b08]",
    text: "text-white",
    muted: "text-white/60",
    accent: "text-yellow-300",
    button: "bg-yellow-300 text-black",
    border: "border-yellow-300/20",
    card: "bg-yellow-300/5 border-yellow-300/20",
    title: "font-serif tracking-tight",
    label: "Luxury Wedding",
  },
};

export default function DynamicInvitationTheme({
  invitation,
  rsvps,
  rsvpForm,
}: {
  invitation: Invitation;
  rsvps: RsvpItem[];
  rsvpForm: React.ReactNode;
}) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const selectedTheme =
    themeStyles[invitation.theme as keyof typeof themeStyles] || themeStyles.elegant;

  const eventDate = useMemo(() => new Date(`${invitation.event_date}T00:00:00`), [invitation.event_date]);

  useEffect(() => {
    setCurrentUrl(window.location.href);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const formattedDate = eventDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const mapsUrl = invitation.maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation.venue_name)}`;

  const whatsappText = encodeURIComponent(
    `Kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan ${invitation.bride_name} & ${invitation.groom_name}.\n\nBuka undangan:\n${currentUrl}`
  );

  return (
    <main className={`min-h-screen ${selectedTheme.bg} ${selectedTheme.text} overflow-hidden`}>
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(255,215,160,0.10),_transparent_42%)]" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className={`uppercase tracking-[0.4em] text-sm ${selectedTheme.accent} mb-6`}>
            {selectedTheme.label}
          </p>
          <h1 className={`text-6xl md:text-8xl font-bold leading-tight mb-6 ${selectedTheme.title}`}>
            {invitation.bride_name}
            <span className={`block ${selectedTheme.accent}`}>&</span>
            {invitation.groom_name}
          </h1>
          <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto ${selectedTheme.muted}`}>
            {invitation.story || "Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dan menjadi bagian dari hari bahagia kami."}
          </p>
          <a href="#detail" className={`inline-block ${selectedTheme.button} px-8 py-4 rounded-full font-semibold`}>
            Buka Undangan
          </a>
        </div>
      </section>

      <section id="detail" className={`px-6 py-24 ${selectedTheme.section}`}>
        <div className="max-w-5xl mx-auto text-center">
          <p className={`uppercase tracking-[0.3em] mb-4 ${selectedTheme.accent}`}>Save The Date</p>
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${selectedTheme.title}`}>{formattedDate}</h2>
          <p className={`text-lg mb-12 ${selectedTheme.muted}`}>Bertempat di {invitation.venue_name}</p>

          <div className="grid grid-cols-4 gap-3 md:gap-4 mb-12">
            {[["Hari", timeLeft.days], ["Jam", timeLeft.hours], ["Menit", timeLeft.minutes], ["Detik", timeLeft.seconds]].map(([label, value]) => (
              <div key={String(label)} className={`rounded-2xl p-4 md:p-5 border ${selectedTheme.card}`}>
                <p className="text-2xl md:text-3xl font-bold">{value}</p>
                <p className={`text-xs ${selectedTheme.muted}`}>{label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={mapsUrl} target="_blank" className={`${selectedTheme.button} px-8 py-4 rounded-full font-semibold`}>
              Buka Google Maps
            </a>
            <a href={`https://wa.me/?text=${whatsappText}`} target="_blank" className={`border ${selectedTheme.border} px-8 py-4 rounded-full font-semibold`}>
              Share WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className={`uppercase tracking-[0.3em] mb-4 ${selectedTheme.accent}`}>Doa & Harapan</p>
          <h2 className={`text-3xl md:text-5xl font-bold mb-8 ${selectedTheme.title}`}>
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
          </h2>
          <p className={selectedTheme.muted}>Atas kehadiran dan doa restunya, kami ucapkan terima kasih.</p>
        </div>
      </section>

      <section className={`px-6 py-24 ${selectedTheme.section}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className={`uppercase tracking-[0.3em] mb-4 ${selectedTheme.accent}`}>RSVP & Ucapan</p>
            <h2 className={`text-4xl font-bold ${selectedTheme.title}`}>Kirim Konfirmasi Kehadiran</h2>
          </div>

          {rsvpForm}

          <div className="grid gap-4 mt-10">
            {rsvps.length === 0 ? (
              <p className={`text-center ${selectedTheme.muted}`}>Belum ada ucapan.</p>
            ) : (
              rsvps.map((item) => (
                <div key={item.id} className={`rounded-2xl p-5 border ${selectedTheme.card}`}>
                  <div className="flex justify-between gap-4 mb-2">
                    <h3 className="font-bold">{item.guest_name}</h3>
                    <span className={selectedTheme.accent}>{item.attendance}</span>
                  </div>
                  <p className={selectedTheme.muted}>{item.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center opacity-50">
        <p>Hidup Bersamamu Digital Invitation</p>
      </footer>
    </main>
  );
}
