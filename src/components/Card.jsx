import React from 'react'

export default function Card({ children, className = '', onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-md border border-[#FDEDED] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group ${className}`}
    >
      {children}
    </div>
  )
}