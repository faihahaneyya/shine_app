import { useState } from "react";
import InputField from "./components/InputField";

export default function UserForm() {
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        jumlah: "",
        kategori: "",
        metode: ""
    });

    const [errors, setErrors] = useState({});
    const [hasil, setHasil] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false); // State untuk layar sukses

    const validateField = (name, value) => {
        let errorMsg = "";

        if (name === "nama") {
            if (!value) errorMsg = "Nama lengkap wajib diisi!";
            else if (value.length < 3) errorMsg = "Nama minimal 3 karakter!";
            else if (/[0-9]/.test(value)) errorMsg = "Nama tidak boleh mengandung angka!";
        }

        if (name === "email") {
            if (!value) errorMsg = "Email wajib diisi!";
            else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = "Format email tidak valid!";
            else if (!value.includes("gmail.com") && !value.includes("yahoo.com")) errorMsg = "Gunakan domain email populer (gmail/yahoo)!";
        }

        if (name === "jumlah") {
            if (!value) errorMsg = "Jumlah tiket wajib diisi!";
            else if (parseInt(value) <= 0) errorMsg = "Minimal pemesanan 1 tiket!";
            else if (parseInt(value) > 5) errorMsg = "Maksimal pemesanan 5 tiket per akun!";
        }

        if (name === "kategori" && !value) errorMsg = "Silakan pilih kategori tiket!";
        if (name === "metode" && !value) errorMsg = "Silakan pilih metode pembayaran!";

        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const isReady = 
        formData.nama && formData.email && formData.jumlah && formData.kategori && formData.metode &&
        !Object.values(errors).some(msg => msg !== "");

    const hitungPesanan = (e) => {
        e.preventDefault();
        const hargaBase = formData.kategori === "VIP Electric" ? 5000000 : 2000000;
        const total = hargaBase * parseInt(formData.jumlah);
        setHasil({ ...formData, total });
        setIsSubmitted(true); // Pindah ke layar sukses
    };

    return (
        <div className="flex flex-col items-center justify-center py-8 px-4 bg-[#020617] font-sans min-h-screen">
            <div className="flex flex-col md:flex-row bg-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden w-full max-w-5xl border border-white/10 min-h-[550px]">
                
                {!isSubmitted ? (
                    <>
                        {/* TAMPILAN FORM (SEBELUM SUBMIT) */}
                        <div className="md:w-7/12 p-8 lg:p-10 border-r border-white/5 animate-in fade-in duration-500">
                            <header className="mb-8 text-center md:text-left">
                                <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">
                                    LANY <span className="text-blue-500">.</span>
                                </h2>
                                <p className="text-slate-300 text-[10px] font-bold tracking-[0.3em] uppercase mt-1">
                                    Booking System: Jakarta 2026
                                </p>
                            </header>

                            <form onSubmit={hitungPesanan} className="space-y-5">
                                <div className="space-y-1">
                                    <InputField label="Nama Lengkap" name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama sesuai ID..." />
                                    {errors.nama && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-2">{errors.nama}</p>}
                                </div>

                                <div className="space-y-1">
                                    <InputField label="Alamat Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="nama@email.com" />
                                    {errors.email && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-2">{errors.email}</p>}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <InputField label="Jumlah Tiket" name="jumlah" type="number" value={formData.jumlah} onChange={handleChange} placeholder="0" />
                                        {errors.jumlah && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-2">{errors.jumlah}</p>}
                                    </div>
                                    <div className="text-left space-y-1">
                                        <label className="block text-blue-400 font-bold mb-2 text-[10px] uppercase tracking-widest">Kategori</label>
                                        <select name="kategori" value={formData.kategori} onChange={handleChange} className={`w-full p-3 bg-white/5 border ${errors.kategori ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-blue-500 outline-none transition-all font-semibold text-white`}>
                                            <option value="" className="bg-slate-900">Pilih Tiket</option>
                                            <option value="Festival" className="bg-slate-900">Festival</option>
                                            <option value="VIP Electric" className="bg-slate-900">VIP Electric</option>
                                        </select>
                                        {errors.kategori && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-2">{errors.kategori}</p>}
                                    </div>
                                </div>

                                <div className="text-left space-y-1">
                                    <label className="block text-blue-400 font-bold mb-2 text-[10px] uppercase tracking-widest">Metode Pembayaran</label>
                                    <select name="metode" value={formData.metode} onChange={handleChange} className={`w-full p-3 bg-white/5 border ${errors.metode ? 'border-red-500' : 'border-white/10'} rounded-xl focus:border-blue-500 outline-none transition-all font-semibold text-white`}>
                                        <option value="" className="bg-slate-900">Pilih Metode</option>
                                        <option value="Transfer VA" className="bg-slate-900">Transfer VA</option>
                                        <option value="E-Wallet" className="bg-slate-900">E-Wallet</option>
                                    </select>
                                    {errors.metode && <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider pl-2">{errors.metode}</p>}
                                </div>

                                <div className="pt-4">
                                    {isReady ? (
                                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95 uppercase tracking-widest text-sm">
                                            Hitung Total Pembayaran
                                        </button>
                                    ) : (
                                        <div className="w-full bg-white/5 text-slate-300 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest text-center border border-dashed border-white/10">
                                            Lengkapi Data Dengan Benar
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* RINGKASAN SAMPING (Hanya tampil saat input) */}
                        <div className="md:w-5/12 bg-[#0a0f1e]/80 p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-10"></div>
                            <div className="relative z-10">
                                <h3 className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-8 pb-2 border-b border-white/10">Ticket Summary</h3>
                                {hasil ? (
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Pemesan</p>
                                            <p className="text-xl font-bold">{hasil.nama}</p>
                                        </div>
                                        <div className="pt-6 border-t border-white/10">
                                            <p className="text-[10px] text-blue-400 uppercase font-bold tracking-widest mb-1">Estimasi Total</p>
                                            <p className="text-4xl font-black italic text-white">Rp{hasil.total.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-16 text-center opacity-30 border-2 border-dashed border-white/5 rounded-3xl">
                                        <p className="text-[10px] uppercase tracking-widest">Menunggu Input...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    /* TAMPILAN BERHASIL (SETELAH SUBMIT) */
                    <div className="w-full flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-2">Pemesanan Berhasil!</h2>
                        <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Konfirmasi tiket telah dikirim ke {hasil.email}</p>
                        
                        <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] w-full max-w-sm mb-8 backdrop-blur-md">
                            <p className="text-slate-500 uppercase text-[9px] font-bold tracking-[0.2em] mb-4">Ringkasan Akhir</p>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm"><span className="text-slate-400">Item:</span><span className="text-white font-bold">{hasil.jumlah}x {hasil.kategori}</span></div>
                                <div className="flex justify-between text-sm"><span className="text-slate-400">Metode:</span><span className="text-white font-bold">{hasil.metode}</span></div>
                                <div className="flex justify-between pt-3 border-t border-white/5 text-lg"><span className="text-blue-500 font-black italic">TOTAL</span><span className="text-white font-black italic">Rp{hasil.total.toLocaleString()}</span></div>
                            </div>
                        </div>

                        <button 
                            onClick={() => {setIsSubmitted(false); setHasil(null); setFormData({nama:"", email:"", jumlah:"", kategori:"", metode:""})}}
                            className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all border-b border-transparent hover:border-white pb-1"
                        >
                            Buat Pesanan Baru
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}