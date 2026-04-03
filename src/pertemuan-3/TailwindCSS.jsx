import React from "react";

export default function TailwindCSS() {
    return (
        <div className="bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
            {/* HERO SECTION */}
            <div className="relative overflow-hidden pt-20 pb-16 px-6">
                {/* Ornamen Latar Belakang */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                        LANY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">2026</span>
                    </h1>
                    <p className="mt-6 text-blue-300/80 max-w-2xl font-bold uppercase tracking-[0.4em] text-xs md:text-sm">
                        A Beautiful Blur: Jakarta Tour / Experience The Night
                    </p>
                    
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all active:scale-95 uppercase tracking-widest text-xs">
                            Reserve Ticket Now
                        </button>
                        <button className="border border-white/10 hover:bg-white/5 backdrop-blur-md text-white px-10 py-4 rounded-2xl font-black transition-all uppercase tracking-widest text-xs">
                            View Schedule
                        </button>
                    </div>
                </div>
            </div>

            {/* FEATURES GRID - Diperbarui dengan gap yang lebih luas */}
            <div className="max-w-6xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10"> {/* gap-10 memberikan jarak antar kartu yang lebih lega */}
                    <FeatureCard 
                        title="Venue Layout" 
                        desc="Tata letak kursi festival yang lega untuk kenyamanan maksimal fans Jakarta."
                        icon="📍"
                    />
                    <FeatureCard 
                        title="Stage Lighting" 
                        desc="Sistem pencahayaan dinamis yang merepresentasikan kedalaman visual panggung."
                        icon="💡"
                    />
                    <FeatureCard 
                        title="VIP Experience" 
                        desc="Akses eksklusif dengan fasilitas premium di barisan paling depan."
                        icon="✨"
                    />
                </div>

                {/* QUOTE SECTION */}
                <div className="mt-24 text-center py-16 bg-gradient-to-b from-transparent via-white/5 to-transparent border-y border-white/5">
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase italic opacity-90">
                        "The Electric Experience"
                    </h2>
                    <p className="text-blue-400/60 text-lg mt-4 italic font-light tracking-wide">
                        Musik LANY adalah tentang emosi, dan antarmuka ini adalah tentang koneksi.
                    </p>
                </div>

                {/* FOOTER NAV */}
                <footer className="mt-20">
                    <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <div className="mb-6 md:mb-0">
                            <h1 className="text-2xl font-black text-blue-500 italic tracking-tighter uppercase">LANY.JKT</h1>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Official Ticketing Partner</p>
                        </div>
                        <ul className="flex space-x-6 md:space-x-10">
                            {['Event', 'Tickets', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-blue-400 font-bold text-xs uppercase tracking-[0.2em] transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
}

// Sub-komponen dengan Hover Effect yang lebih "Electric"
function FeatureCard({ title, desc, icon }) {
    return (
        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-500 group shadow-lg relative overflow-hidden">
            {/* Dekorasi Glow saat Hover */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 transform-gpu">{icon}</div>
            
            <h3 className="text-xl font-black text-blue-400 uppercase tracking-widest mb-4 group-hover:text-blue-300 transition-colors">
                {title}
            </h3>
            
            <p className="text-slate-400 leading-relaxed text-sm font-medium group-hover:text-slate-300 transition-colors">
                {desc}
            </p>
        </div>
    );
}