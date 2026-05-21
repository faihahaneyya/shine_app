import React from 'react'
import { FiTrendingUp, FiChevronRight } from 'react-icons/fi'
import BadgeStatus from './BadgeStatus'
import Card from './Card' // Hubungkan ke komponen Card utama

export default function CustomerCard({ customer, onClick, delay = 0 }) {
  return (
    <Card 
      onClick={onClick} 
      className="animate-fade-in-up" 
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Bagian Atas Kartu Pelanggan */}
      <div className="bg-gradient-to-r from-[#F875AA]/10 to-[#AEDEFC]/10 p-4 border-b border-[#FDEDED]">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] flex items-center justify-center text-white font-bold text-lg shadow-md">
              {customer.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-[#F875AA] transition-colors">{customer.name}</h3>
              <p className="text-xs text-gray-400">{customer.email}</p>
            </div>
          </div>
          <div className="flex gap-1 flex-col items-end">
            <BadgeStatus status={customer.tier} />
          </div>
        </div>
      </div>

      {/* Bagian Konten Poin & Transaksi */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-[#FDEDED] rounded-lg">
            <p className="text-2xl font-bold text-[#F875AA]">{customer.points.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Points</p>
          </div>
          <div className="text-center p-2 bg-[#FDEDED] rounded-lg flex flex-col justify-center items-center">
            <BadgeStatus status={customer.tier} />
            <p className="text-xs text-gray-500 mt-1">Tier</p>
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center pt-3 border-t border-[#FDEDED]">
          <div className="flex items-center gap-1">
            <FiTrendingUp className="text-xs text-gray-400" />
            <span className="text-sm text-gray-600">{customer.orders} transactions</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${customer.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs text-gray-400">{customer.active ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
      </div>

      {/* Bagian Bawah Kartu */}
      <div className="bg-gray-50 px-4 py-2 text-right border-t border-[#FDEDED]">
        <span className="text-xs text-gray-400 flex items-center justify-end gap-1">
          Click for details <FiChevronRight className="text-xs" />
        </span>
      </div>
    </Card>
  )
}