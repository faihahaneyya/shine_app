import React from 'react'

export default function ProgressBarCircle({ label, percentage, color = '#F875AA' }) {
  return (
    <div className="text-center group cursor-pointer">
      <div className="relative w-20 h-20 mx-auto mb-2">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle cx="40" cy="40" r="34" stroke="#E5E7EB" strokeWidth="6" fill="none" />
          <circle 
            cx="40" 
            cy="40" 
            r="34" 
            stroke={color} 
            strokeWidth="6" 
            fill="none" 
            strokeDasharray={`${percentage * 2.13} 213.6`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out group-hover:opacity-80"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color: color }}>
          {percentage}%
        </span>
      </div>
      <p className="text-xs text-gray-600">{label}</p>
    </div>
  )
}