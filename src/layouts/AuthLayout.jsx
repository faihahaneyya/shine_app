import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    // Background luar berwarna biru muda pucat
    <div className="min-h-screen flex items-center justify-center bg-[#AEDEFC] p-4 lg:p-8 font-sans">
      {/* Container Utama (Card Putih) */}
      <div className="w-full max-w-6xl min-h-[650px] flex overflow-hidden rounded-[3rem] shadow-2xl bg-white animate-fade-in">
        {/* SISI KIRI: Branding na_store.id dengan gaya Clover */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#F875AA] relative overflow-hidden items-center justify-center">
          {/* Dekorasi Lengkung (Shape ala Clover) */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFDFEB] rounded-bl-[100px] opacity-80"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#FFDFEB] rounded-tr-[140px] opacity-80"></div>

          {/* Konten Branding */}
          <div className="relative z-10 p-12 text-center text-white">
            <div className="mb-6 inline-block bg-white/20 p-4 rounded-3xl backdrop-blur-md animate-bounce-subtle">
              <span className="text-5xl">✨</span>
            </div>

            <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-tight mb-4">
              NA_STORE
              <br />
              <span className="text-[#FFDFEB]">ACCESSORIE</span>
            </h1>

            <p className="text-lg font-medium opacity-90 mb-10 tracking-wide">
              Handmade with Love & Care
            </p>

            {/* Statistik yang dipertahankan dari kode lama */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/30 pt-8">
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-xs uppercase opacity-80">Clients</p>
              </div>
              <div>
                <p className="text-2xl font-bold">1K+</p>
                <p className="text-xs uppercase opacity-80">Sold</p>
              </div>
              <div>
                <p className="text-2xl font-bold">4.9</p>
                <p className="text-xs uppercase opacity-80">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* SISI KANAN: Tempat Form (Login/Register) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 bg-white relative">
          <div className="w-full max-w-md">
            {/* Logo Mobile (Muncul di layar kecil saja) */}
            <div className="lg:hidden text-center mb-10">
              <h1 className="text-[#F875AA] text-3xl font-black italic">
                NA_STORE.ID
              </h1>
              <div className="h-1 w-12 bg-[#AEDEFC] mx-auto mt-2 rounded-full"></div>
            </div>

            {/* Form dari Outlet (Sign In / Sign Up) */}
            <div className="animate-slide-up">
              <Outlet />

              {/* Divider "Sign In with" */}
              <div className="relative my-10 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-100"></span>
                </div>
                <span className="relative bg-white px-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  Sign In with
                </span>
              </div>

              {/* Social Buttons (Style Pil/Clover) */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                {/* Facebook */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <button className="w-full h-11 bg-[#3b5998] text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all group-hover:-translate-y-1">
                    <span className="font-bold text-lg italic">f</span>
                  </button>
                  <span className="text-[10px] font-bold text-gray-400">
                    Facebook
                  </span>
                </div>

                {/* Google */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <button className="w-full h-11 bg-[#ff3d00] text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all group-hover:-translate-y-1">
                    <span className="font-bold text-lg">G</span>
                  </button>
                  <span className="text-[10px] font-bold text-gray-400">
                    Google
                  </span>
                </div>

                {/* Twitter */}
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                  <button className="w-full h-11 bg-[#00acee] text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all group-hover:-translate-y-1">
                    <svg
                      width="18"
                      height="18"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                  <span className="text-[10px] font-bold text-gray-400">
                    twitter
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer kecil di pojok bawah */}
          <p className="absolute bottom-8 text-gray-400 text-xs">
            © 2026 na_store.id - Handmade Accessories
          </p>
        </div>
      </div>

      {/* Style untuk animasi kustom */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceSubtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s ease-out delay-200ms; }
        .animate-bounce-subtle { animation: bounceSubtle 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
