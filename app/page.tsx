export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <p className="mb-4 text-sm uppercase tracking-[0.3em] text-pink-300">
        Undangan Digital
      </p>

      <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
        Hidup Bersamamu
      </h1>

      <p className="text-lg md:text-xl text-center max-w-2xl mb-10 text-gray-300">
        Buat undangan digital impianmu dengan mudah, elegan, dan modern.
        Mulai gratis, aktifkan premium saat siap dibagikan.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200">
          Buat Undangan Gratis
        </button>

        <button className="border border-white px-8 py-4 rounded-full hover:bg-white hover:text-black">
          Lihat Demo
        </button>
      </div>
    </main>
  );
}