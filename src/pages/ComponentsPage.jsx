import { useState } from 'react';
import { 
  FiLayers, FiCheckCircle, FiAlertCircle, FiInfo, FiTrash2, 
  FiEdit, FiSearch, FiCalendar, FiArrowRight, FiSliders 
} from 'react-icons/fi';

export default function ComponentsPage() {
  // State untuk komponen interaktif (Form & Feedback)
  const [inputText, setInputText] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // State tambahan untuk Tabs

  // Data contoh untuk komponen Table & Card
  const mockProducts = [
    { id: 1, name: 'Beaded Bracelet Soft Pink', category: 'Bracelets', price: 'Rp 15.000', stock: 12 },
    { id: 2, name: 'Daisy Flower Necklace', category: 'Necklaces', price: 'Rp 24.500', stock: 5 },
    { id: 3, name: 'Clear Aesthetic Keychain', category: 'Keychains', price: 'Rp 8.000', stock: 0 },
  ];

  return (
    <div className="space-y-10 animate-fade-in-up bg-[#FFFAF4]/30 min-h-screen p-6">
      
      {/* 1. LAYOUT COMPONENT: Page Header & Breadcrumb */}
      <div className="bg-gradient-to-r from-[#FFF5E4] to-[#FDEDED] p-6 rounded-2xl border border-[#FEFDED] shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span className="text-[#F875AA]">✨</span>
          <span>Tugas Kuliah</span>
          <span>/</span>
          <span className="text-gray-700 font-medium">15 Komponen Praktikum</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] bg-clip-text text-transparent flex items-center gap-2">
          <FiLayers className="text-[#F875AA]" /> Galeri Komponen React
        </h1>
        <p className="text-sm text-gray-500 mt-1">Breakdown komponen modular sesuai standarisasi Pertemuan 10.</p>
      </div>

      {/* ========================================================================= */}
      {/* KATEGORI A: BASIC COMPONENTS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-700 border-b-2 border-dashed border-[#F875AA]/30 pb-2">
          A. Basic Components (Tombol, Badge, Avatar)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          
          {/* Komponen 2: Kumpulan Variasi Button */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">2. Button Variants</label>
            <div className="flex flex-wrap gap-2">
              <button className="bg-[#F875AA] hover:bg-[#F55593] text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-all hover:scale-105">
                Primary Button
              </button>
              <button className="bg-[#AEDEFC] hover:bg-[#89CFF0] text-gray-700 px-4 py-2 rounded-xl text-sm font-medium shadow-sm transition-all hover:scale-105">
                Secondary Button
              </button>
              <button className="border border-[#F875AA] text-[#F875AA] hover:bg-[#FDEDED] px-4 py-2 rounded-xl text-sm font-medium transition-all">
                Outline
              </button>
            </div>
          </div>

          {/* Komponen 3: Status Badges */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">3. Status Badges</label>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600 border border-green-200">
                In Stock
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600 border border-yellow-200">
                Low Stock
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600 border border-red-200">
                Out of Stock
              </span>
            </div>
          </div>

          {/* Komponen 4: User Avatar */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">4. Profile Avatar</label>
            <div className="flex items-center gap-3 pt-1">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#F875AA] to-[#AEDEFC] flex items-center justify-center text-white font-bold text-lg shadow-md">
                  NA
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Na_store Staf</p>
                <p className="text-xs text-gray-400">Online</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* KATEGORI B: DATA DISPLAY COMPONENTS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-700 border-b-2 border-dashed border-[#F875AA]/30 pb-2">
          B. Data Display Components (Card, Table, Grid, Navigation)
        </h2>
        
        {/* Komponen 5, 6, 7: Mini Info Card (Grid Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'Total Produk', value: '148 Pcs', color: 'bg-blue-50 text-blue-600 border-blue-100' },
            { title: 'Kategori Aktif', value: '4 Kategori', color: 'bg-pink-50 text-pink-600 border-pink-100' },
            { title: 'Pesanan Baru', value: '9 Transaksi', color: 'bg-purple-50 text-purple-600 border-purple-100' },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex justify-between items-center group hover:shadow-md transition-all">
              <div>
                <p className="text-xs text-gray-400 font-medium">{item.title}</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{item.value}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-lg font-bold border ${item.color}`}>Komponen {5 + index}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Komponen 8: Product Showcase Card */}
          <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">8. Product Display Card</label>
            <div className="bg-[#FFFAF4] rounded-xl p-4 border border-[#FEFDED] relative overflow-hidden group">
              <div className="absolute top-2 right-2 bg-[#F875AA] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                BEST SELLER ✨
              </div>
              <div className="h-40 bg-gradient-to-br from-[#FDEDED] to-[#FFF5E4] rounded-lg flex items-center justify-center text-4xl mb-4 group-hover:scale-105 transition-transform duration-300">
                🌸
              </div>
              <h4 className="font-bold text-gray-800">Custom Beaded Ring Pinky</h4>
              <p className="text-xs text-gray-400">Aksesoris Cincin Manik-Manik Cantik</p>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-dashed border-gray-200">
                <span className="text-sm font-extrabold text-[#F875AA]">Rp 5.500</span>
                <span className="text-xs text-gray-500 font-medium">Sisa 8 pcs</span>
              </div>
            </div>
          </div>

          {/* Komponen 9 & 10: Data Table & Tabs Navigation Component */}
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">9 & 10. Table with Tabs Filter</label>
              
              {/* Tambahan Komponen 10: Tabs Navigation / Pagination Control */}
              <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-medium text-gray-600">
                {['all', 'ready', 'empty'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg capitalize transition-all ${activeTab === tab ? 'bg-white text-gray-800 shadow-sm font-bold' : 'hover:text-gray-900'}`}
                  >
                    {tab === 'all' ? 'Semua' : tab === 'ready' ? 'Ready' : 'Habis'}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-600 text-xs font-bold uppercase">
                  <tr>
                    <th className="px-4 py-3 border-b">Nama</th>
                    <th className="px-4 py-3 border-b">Kategori</th>
                    <th className="px-4 py-3 border-b">Harga</th>
                    <th className="px-4 py-3 border-b">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
                  {mockProducts
                    .filter(p => activeTab === 'all' || (activeTab === 'ready' && p.stock > 0) || (activeTab === 'empty' && p.stock === 0))
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                        <td className="px-4 py-3">{p.category}</td>
                        <td className="px-4 py-3 text-[#F875AA] font-semibold">{p.price}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md"><FiEdit size={14} /></button>
                            <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"><FiTrash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* KATEGORI C: FORM COMPONENTS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-700 border-b-2 border-dashed border-[#F875AA]/30 pb-2">
          C. Form Components (Input, Filter, Select, Checkbox)
        </h2>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Komponen 11: Input Field Ber-Icon */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500">11. Input Field with Icon</label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari aksesoris..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full text-sm pl-9 pr-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F875AA] focus:ring-2 focus:ring-[#F875AA]/10"
              />
            </div>
            {inputText && <p className="text-[11px] text-gray-400 italic">Mengetik: "{inputText}"</p>}
          </div>

          {/* Komponen 12: Select Options Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500">12. Custom Dropdown Select</label>
            <select 
              value={selectValue} 
              onChange={(e) => setSelectValue(e.target.value)}
              className="w-full text-sm px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F875AA] bg-white"
            >
              <option value="">-- Pilih Kategori --</option>
              <option value="gelang">Gelang Manik</option>
              <option value="kalung">Kalung Estetik</option>
              <option value="cincin">Cincin Pita</option>
            </select>
          </div>

          {/* Komponen 13: Checkbox Option */}
          <div className="space-y-2 flex flex-col justify-between">
            <label className="text-xs font-semibold text-gray-500">13. Interactive Checkbox</label>
            <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl bg-gray-50 hover:bg-[#FDEDED]/40 transition-colors">
              <input 
                type="checkbox" 
                checked={checkboxValue}
                onChange={(e) => setCheckboxValue(e.target.checked)}
                className="rounded text-[#F875AA] focus:ring-[#F875AA] h-4 w-4"
              />
              <span className="text-xs text-gray-600 font-medium">Terapkan Bungkus Kado (+Rp2k)</span>
            </label>
          </div>

          {/* Komponen 14: Date Picker Component */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500">14. Custom Date Picker</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="date" 
                className="w-full text-sm pl-9 pr-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F875AA]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* KATEGORI D: FEEDBACK COMPONENTS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-700 border-b-2 border-dashed border-[#F875AA]/30 pb-2">
          D. Feedback Components (Alert & Modal Pop-Up)
        </h2>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Komponen 15: Alert Banner System */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">15. Notification Alert</label>
            <button 
              onClick={() => setShowAlert(!showAlert)}
              className="w-full bg-[#AEDEFC] hover:bg-[#AEDEFC]/80 text-gray-700 text-xs py-2 rounded-xl font-bold transition-all"
            >
              {showAlert ? 'Sembunyikan Contoh Alert' : 'Picu Trigger Alert Transaksi'}
            </button>
            
            {showAlert && (
              <div className="flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl animate-fade-in text-xs">
                <FiCheckCircle className="mt-0.5 flex-shrink-0 text-base" />
                <div>
                  <span className="font-bold">Berhasil Disimpan!</span>
                  <p className="text-green-600 mt-0.5">Data stok gelang manik baru na_store berhasil diupdate ke server database.</p>
                </div>
              </div>
            )}
          </div>

          {/* Komponen 16 (Bonus/Alternatif): Modal Dialog Component */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">16. Modal Dialog Pop-up</label>
            <button 
              onClick={() => setShowModal(true)}
              className="w-full bg-[#F875AA] hover:bg-[#F875AA]/90 text-white text-xs py-2 rounded-xl font-bold shadow-sm transition-all"
            >
              Buka Preview Modal Konfirmasi
            </button>

            {showModal && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                <div className="bg-white p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl border border-gray-50">
                  <div className="flex items-center gap-3 text-yellow-500">
                    <FiAlertCircle size={24} />
                    <h3 className="font-bold text-gray-800 text-lg">Konfirmasi Aksi</h3>
                  </div>
                  <p className="text-sm text-gray-500">Apakah kamu yakin ingin menghapus atau mengubah data inventori produk na_store ini?</p>
                  <div className="flex justify-end gap-2 pt-2">
                    <button 
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs font-medium"
                    >
                      Batal
                    </button>
                    <button 
                      onClick={() => { setShowModal(false); alert('Data sukses diproses!'); }}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-medium"
                    >
                      Ya, Proses
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* KATEGORI E: SECTION COMPONENTS */}
      {/* ========================================================================= */}
      {/* Komponen 17 (Atau penutup): Footer Branding Section */}
      <footer className="bg-gradient-to-r from-[#FFF5E4] to-[#FDEDED] p-5 rounded-2xl border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div>
          <span className="text-[10px] bg-[#F875AA] text-white font-extrabold px-2 py-0.5 rounded-md uppercase tracking-widest block w-max mx-auto sm:mx-0 mb-1">
            Footer Section
          </span>
          <p className="text-sm font-bold text-gray-700">© 2026 Admin na_store.id</p>
          <p className="text-xs text-gray-400">Dibuat khusus untuk demonstrasi Tugas Kelompok CRM - Praktikum Sistem Informasi.</p>
        </div>
        <div className="flex gap-2 text-xs text-gray-500 font-medium">
          <span className="px-3 py-1 bg-white rounded-lg border">React 18</span>
          <span className="px-3 py-1 bg-white rounded-lg border">Tailwind CSS</span>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
}