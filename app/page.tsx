export default function Home() {
  return (
    <main className="min-h-screen bg-[#070504] text-white">
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(252,211,77,0.20),_transparent_36%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.14),_transparent_42%)]" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-amber-200">
            Undangan Digital Freemium
          </p>
          <h1 className="text-5xl md:text-8xl font-serif font-bold leading-tight mb-8">
            Hidup Bersamamu
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Buat undangan digital sendiri, pilih tema, preview gratis, lalu aktifkan premium saat siap dibagikan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="bg-amber-200 text-black px-8 py-4 rounded-full font-semibold">
              Buat Undangan Gratis
            </a>
            <a href="/login" className="border border-white/40 px-8 py-4 rounded-full font-semibold">
              Login Member
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            ["Coba Gratis", "Member bisa membuat undangan dan melihat preview tanpa bayar."],
            ["Upgrade Premium", "Link public aktif hanya setelah status undangan menjadi premium."],
            ["Tema Cantik", "Elegant, Floral, Islamic, dan Luxury siap dipakai."],
          ].map(([title, desc]) => (
            <div key={title} className="border border-white/10 rounded-3xl p-8 bg-white/5">
              <h2 className="text-2xl font-bold mb-3">{title}</h2>
              <p className="text-white/60">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
