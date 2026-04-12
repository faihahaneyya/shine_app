export default function FlowerGuest({ data }) {
    return (
        // responsive design
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.map((item) => (
                <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-pink-50 group">
                    <div className="h-64 overflow-hidden relative">
                        {/* 1. PERUBAHAN SOURCE GAMBAR KE ASSETS LOKAL */}
                        <img 
                            src={new URL(`../assets/${item.image}`, import.meta.url).href} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-pink-600">
                            {item.occasion.vibe}
                        </div>
                    </div>
                    
                    <div className="p-8 text-center">
                        <span className="text-pink-300 text-xs font-medium italic">{item.type}</span>
                        <h3 className="text-xl font-serif text-slate-800 mt-1 mb-2">{item.name}</h3>
                        
                        {/* 2. MENAMPILKAN SERVICES (LAYANAN) */}
                        <div className="mb-4">
                            <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-1">Included Services:</p>
                            <div className="flex flex-wrap justify-center gap-1">
                                {item.services.map((svc, index) => (
                                    <span key={index} className="text-[10px] text-pink-400 bg-pink-50/50 px-2 py-0.5 rounded">
                                        • {svc}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-pink-50 text-pink-500 rounded-full text-[10px] uppercase font-bold">{item.details.mainFlower}</span>
                            <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] uppercase font-bold">{item.details.size}</span>
                        </div>

                        <div className="border-t border-pink-50 pt-6 flex items-center justify-between">
                            <div className="text-left">
                                <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Price Start From</p>
                                <p className="text-lg font-bold text-slate-700">Rp {item.price.toLocaleString()}</p>
                            </div>
                            <button className="bg-pink-400 hover:bg-pink-500 text-white w-10 h-10 rounded-full transition-colors flex items-center justify-center shadow-lg shadow-pink-200">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}