import React from 'react'
import IconWrapper from './IconWrapper'

export default function StatCard({ title, value, icon, color, delay = 0 }) {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <IconWrapper icon={icon} color={color} />
      </div>
    </div>
  )
}