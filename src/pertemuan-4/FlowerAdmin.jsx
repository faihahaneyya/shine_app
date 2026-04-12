export default function FlowerAdmin({ data }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            {/* responsive design */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr className="text-slate-500 text-sm uppercase tracking-wider">
                            <th className="p-5 font-semibold">Product</th>
                            <th className="p-5 font-semibold">Details (Nested)</th>
                            <th className="p-5 font-semibold">Services</th> {/* Kolom tambahan */}
                            <th className="p-5 font-semibold">Occasion</th>
                            <th className="p-5 font-semibold">Stock</th>
                            <th className="p-5 font-semibold">Price</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-pink-50/30 transition-colors">
                                <td className="p-5">
                                    <div className="flex items-center gap-4">
                                        {/* PERUBAHAN SOURCE GAMBAR KE ASSETS LOKAL */}
                                        <img 
                                            src={new URL(`../assets/${item.image}`, import.meta.url).href} 
                                            alt={item.name}
                                            className="w-14 h-14 rounded-2xl object-cover border border-pink-100" 
                                        />
                                        <div>
                                            <p className="font-bold text-slate-800 leading-none mb-1">{item.name}</p>
                                            <p className="text-xs text-slate-400">{item.type}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5 text-sm text-slate-600 italic">
                                    {item.details.mainFlower} <span className="text-slate-300">|</span> {item.details.wrapperColor}
                                </td>
                                {/* MENAMPILKAN SERVICES DI ADMIN */}
                                <td className="p-5">
                                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                                        {item.services.map((svc, idx) => (
                                            <span key={idx} className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                                                {svc}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-5">
                                    <p className="text-sm font-medium leading-none mb-1">{item.occasion.suitableFor}</p>
                                    <p className="text-[10px] text-pink-400 font-bold uppercase tracking-tight">{item.occasion.meaning}</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <span className={`px-3 py-1 rounded-full font-bold ${item.stock < 5 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                        {item.stock} pcs
                                    </span>
                                </td>
                                <td className="p-5 font-bold text-slate-700 whitespace-nowrap">
                                    Rp {item.price.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}