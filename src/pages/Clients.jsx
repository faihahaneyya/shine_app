import React, { useState } from 'react';
// Import resmi dari komponen UI yang dibuat otomatis oleh Shadcn CLI
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FiFilter, FiChevronDown, FiActivity, FiFolderMinus, FiUserCheck, FiTrendingUp, FiUserPlus, FiSearch, FiDollarSign } from 'react-icons/fi';

// MEMANGGIL DATA DARI FOLDER DATA JSON
import clientsData from '../data/clients.json'; 

export default function Clients() {
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const [selectedClientIds, setSelectedClientIds] = useState(() => {
    const savedIds = localStorage.getItem('na_store_selected_clients');
    return savedIds ? JSON.parse(savedIds) : [];
  });

  // Fungsi pembantu untuk tambah/hapus ID klien yang dicentang sekaligus update localStorage
  const handleToggleSelect = (id) => {
    let updatedIds;
    if (selectedClientIds.includes(id)) {
      updatedIds = selectedClientIds.filter(clientId => clientId !== id);
    } else {
      updatedIds = [...selectedClientIds, id];
    }
    
    // Perbarui State React
    setSelectedClientIds(updatedIds);
    // Tulis/Simpan perubahan terbaru ke dalam memori LocalStorage browser agar permanen
    localStorage.setItem('na_store_selected_clients', JSON.stringify(updatedIds));
  };

  // Fungsi khusus untuk reset total data ceklis di state dan localStorage
  const handleResetSelection = () => {
    setSelectedClientIds([]);
    localStorage.removeItem('na_store_selected_clients');
  };
  // =========================================================================

  // MENGHITUNG STATISTIK UTAMA
  const totalDeal = clientsData.filter(c => c.status === "Deal").length;
  const totalNegosiasi = clientsData.filter(c => c.status === "Negosiasi").length;
  const totalBaru = clientsData.filter(c => c.status === "Baru").length;

  // PROSES FILTER GANDA
  const filteredClients = clientsData.filter(item => {
    const matchesStatus = filterStatus === "Semua" || item.status === filterStatus;
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // MENGHITUNG ESTIMASI OMSET
  const totalProjectedValue = clientsData
    .filter(item => selectedClientIds.includes(item.id))
    .reduce((sum, item) => {
      const numericValue = parseInt(item.nilai.replace(/[^0-9]/g, ''), 10) || 0;
      return sum + numericValue;
    }, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto bg-[#FFFAF4]/20 min-h-screen font-sans antialiased pb-24 relative">
      
      {/* HEADER SECTION DENGAN BANNER BACKGROUND PUTIH */}
      <div className="mb-6 p-6 bg-white border border-[#FDEDED] rounded-3xl shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-1 tracking-wider uppercase">Dashboard / <span className="text-[#F875AA] font-semibold">Clients</span></p>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">Customer CRM & Management</h1>
          <p className="text-xs text-gray-500 mt-0.5">Log transaksi, negosiasi, dan pencatatan berkas terintegrasi na_store.</p>
        </div>

        {/* CONTROLS BAR: Tempat Search Input & Popover Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          
          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input 
              type="text"
              placeholder="Cari nama atau email klien..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-[#FDEDED] rounded-xl py-2 pl-10 pr-4 text-xs focus:border-[#F875AA] focus:outline-none focus:bg-white transition-all shadow-2xs"
            />
          </div>

          {/* POPOVER FILTER */}
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center justify-center gap-2.5 px-4 py-2 text-sm font-semibold bg-white border border-[#FDEDED] rounded-xl text-gray-700 hover:border-[#F875AA] hover:text-[#F875AA] shadow-2xs hover:shadow-xs transition-all duration-300 group shrink-0">
                <FiFilter className="text-[#F875AA] group-hover:scale-110 transition-transform" />
                <span>Status: <strong className="text-[#F875AA] font-bold">{filterStatus}</strong></span>
                <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${isPopoverOpen ? 'rotate-180 text-[#F875AA]' : ''}`} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-52 bg-white border border-[#FDEDED] rounded-2xl shadow-xl p-2 z-50">
              <p className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">Filter Berkas</p>
              {["Semua", "Baru", "Negosiasi", "Deal"].map((status) => (
                <button 
                  key={status} 
                  onClick={() => { setFilterStatus(status); setIsPopoverOpen(false); }} 
                  className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-all duration-200 ${filterStatus === status ? 'bg-[#F875AA] text-white font-semibold shadow-2xs' : 'text-gray-600 hover:bg-[#FDEDED]/40 hover:text-[#F875AA]'}`}
                >
                  {status}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* MINI STATS CARDS SECTION */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-50/60 to-emerald-100/30 border border-emerald-100 p-4 rounded-3xl flex items-center gap-3.5 shadow-xs">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600"><FiUserCheck className="text-lg" /></div>
          <div>
            <p className="text-[11px] font-bold text-emerald-700/70 uppercase tracking-wider">Total Deal</p>
            <h3 className="text-xl font-black text-gray-800">{totalDeal} <span className="text-xs font-normal text-gray-400">klien</span></h3>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50/60 to-amber-100/30 border border-amber-100 p-4 rounded-3xl flex items-center gap-3.5 shadow-xs">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600"><FiTrendingUp className="text-lg" /></div>
          <div>
            <p className="text-[11px] font-bold text-amber-700/70 uppercase tracking-wider">Negosiasi</p>
            <h3 className="text-xl font-black text-gray-800">{totalNegosiasi} <span className="text-xs font-normal text-gray-400">klien</span></h3>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50/60 to-blue-100/30 border border-blue-100 p-4 rounded-3xl flex items-center gap-3.5 shadow-xs">
          <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600"><FiUserPlus className="text-lg" /></div>
          <div>
            <p className="text-[11px] font-bold text-blue-700/70 uppercase tracking-wider">Klien Baru</p>
            <h3 className="text-xl font-black text-gray-800">{totalBaru} <span className="text-xs font-normal text-gray-400">klien</span></h3>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="mb-6 overflow-hidden rounded-3xl border border-[#FDEDED] bg-white shadow-xs">
        <div className="max-h-[420px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <Table>
            <TableHeader className="bg-gradient-to-r from-[#FFF5E4] to-[#FFF5E4]/60 sticky top-0 z-10 shadow-2xs backdrop-blur-md">
              <TableRow className="hover:bg-transparent border-b border-[#FDEDED]">
                <TableHead className="w-12 text-center py-3.5 pl-4"></TableHead>
                <TableHead className="font-extrabold text-gray-600 py-3.5 text-xs uppercase tracking-wider">ID Klien</TableHead>
                <TableHead className="font-extrabold text-gray-600 py-3.5 text-xs uppercase tracking-wider">Informasi Pelanggan</TableHead>
                <TableHead className="font-extrabold text-gray-600 py-3.5 text-xs uppercase tracking-wider">Estimasi Nilai</TableHead>
                <TableHead className="text-center font-extrabold text-gray-600 py-3.5 text-xs uppercase tracking-wider pr-5">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-16 text-gray-400 bg-[#FFFAF4]/10">
                    <FiFolderMinus className="mx-auto text-4xl mb-3 text-gray-300 animate-pulse" />
                    <p className="font-medium text-sm">Tidak ada data pelanggan yang cocok</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((item) => (
                  <TableRow 
                    key={item.id} 
                    className={`hover:bg-[#FDEDED]/20 border-b border-[#FDEDED]/40 transition-colors duration-200 group ${selectedClientIds.includes(item.id) ? 'bg-[#F875AA]/5' : ''}`}
                  >
                    <TableCell className="text-center py-3 pl-4">
                      <input 
                        type="checkbox"
                        checked={selectedClientIds.includes(item.id)}
                        onChange={() => handleToggleSelect(item.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#F875AA] focus:ring-[#F875AA] cursor-pointer"
                      />
                    </TableCell>

                    <TableCell className="font-mono text-xs font-bold text-gray-400 group-hover:text-gray-600 transition-colors">{item.id}</TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 shadow-2xs transition-transform group-hover:scale-105 duration-300 ${
                          item.status === 'Deal' ? 'bg-emerald-100 text-emerald-700' : 
                          item.status === 'Negosiasi' ? 'bg-amber-100 text-amber-700' : 
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {item.nama[0]}
                        </div>
                        <div>
                          <span className="font-bold text-gray-800 block text-sm group-hover:text-[#F875AA] transition-colors">{item.nama}</span>
                          <span className="text-xs text-gray-400 block font-medium mt-0.5">{item.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-extrabold text-gray-700 text-sm">{item.nilai}</TableCell>
                    <TableCell className="text-center pr-5">
                      <span className={`inline-block text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-xl shadow-3xs ${
                        item.status === 'Deal' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 
                        item.status === 'Negosiasi' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 
                        'bg-blue-50 text-blue-600 border border-blue-200'
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ACCORDION SECTION */}
      <div className="bg-white border border-[#FDEDED] rounded-3xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
          <FiActivity className="text-[#F875AA]" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Jurnal Riwayat Aktivitas Klien</h2>
        </div>
        
        <div className="max-h-[350px] overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <Accordion type="single" collapsible className="w-full space-y-2.5">
            {filteredClients.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border border-[#FDEDED] rounded-2xl overflow-hidden data-[state=open]:border-[#F875AA] data-[state=open]:shadow-3xs transition-all duration-300">
                <AccordionTrigger className="flex justify-between items-center w-full px-5 py-4 text-sm font-bold text-gray-700 hover:text-[#F875AA] hover:no-underline transition-colors">
                  <span className="text-xs sm:text-sm text-left">Log Korespondensi Aktivitas — {item.nama}</span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-xs text-gray-600">
                  <div className="bg-gradient-to-r from-[#FFFAF4]/60 to-[#FFFAF4]/20 p-4 rounded-xl border border-[#FDEDED]/60 text-gray-600 font-medium italic leading-relaxed relative overflow-hidden">
                    <div className={`absolute left-0 top-0 h-full w-1 ${
                      item.status === 'Deal' ? 'bg-emerald-400' : 
                      item.status === 'Negosiasi' ? 'bg-amber-400' : 
                      'bg-blue-400'
                    }`} />
                    "{item.update}"
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* FLOATING ACTION BANNER */}
      {selectedClientIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-50 animate-fade-in">
          <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-xl border border-gray-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#F875AA] rounded-xl text-white">
                <FiDollarSign className="text-base" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Simulasi Omset ({selectedClientIds.length} Klien Terpilih)</p>
                <p className="text-sm font-black text-emerald-400">Rp {totalProjectedValue.toLocaleString('id-ID')}</p>
              </div>
            </div>
            {/* Tombol Diubah Mengarah ke Fungsi handleResetSelection */}
            <button 
              onClick={handleResetSelection}
              className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-colors font-medium"
            >
              Reset Pilihan
            </button>
          </div>
        </div>
      )}

    </div>
  );
}