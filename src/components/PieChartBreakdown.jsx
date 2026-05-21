import React from 'react'
import { FiPieChart } from 'react-icons/fi'

export default function PieChartBreakdown({ income, expense }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-600 font-medium flex items-center gap-2">
          <FiPieChart className="text-[#F875AA]" /> Wednesday Breakdown
        </h3>
        <span className="text-sm font-semibold text-gray-700">
          Income: Rp{income.toLocaleString('id-ID')} | Expense: Rp{expense.toLocaleString('id-ID')}
        </span>
      </div>
      <div className="flex justify-center items-center gap-8 flex-wrap">
        <div className="relative w-40 h-40">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle cx="80" cy="80" r="70" stroke="#F875AA" strokeWidth="20" fill="none" strokeDasharray="219.9 439.8" />
            <circle cx="80" cy="80" r="70" stroke="#AEDEFC" strokeWidth="20" fill="none" strokeDasharray="219.9 439.8" strokeDashoffset="-219.9" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#F875AA]">84%</span>
            <span className="text-xs text-gray-500">Income</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#F875AA] rounded"></div>
            <span className="text-sm text-gray-600">Income: Rp{income.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#AEDEFC] rounded"></div>
            <span className="text-sm text-gray-600">Expense: Rp{expense.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}