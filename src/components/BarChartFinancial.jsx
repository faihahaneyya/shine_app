import React from 'react'
import { FiBarChart2 } from 'react-icons/fi'

export default function BarChartFinancial() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-600 font-medium flex items-center gap-2">
          <FiBarChart2 className="text-[#F875AA]" /> Financial Chart
        </h3>
        <span className="text-xs text-gray-400">Last 7 days</span>
      </div>
      <div className="relative h-48">
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end h-40">
          {days.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 w-12">
              <div className="relative flex gap-1">
                <div 
                  className="w-4 bg-[#F875AA] rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
                  style={{ height: `${Math.random() * 80 + 40}px` }}
                />
                <div 
                  className="w-4 bg-[#AEDEFC] rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
                  style={{ height: `${Math.random() * 60 + 20}px` }}
                />
              </div>
              <span className="text-xs text-gray-500">{day}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#F875AA] rounded"></div>
          <span className="text-xs text-gray-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#AEDEFC] rounded"></div>
          <span className="text-xs text-gray-600">Expense</span>
        </div>
      </div>
    </div>
  )
}