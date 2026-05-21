import React from 'react'

export default function Button({ children, onClick, type = 'primary', disabled = false, icon }) {
  const baseStyles = "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black transition-all duration-200 transform active:scale-95 shadow-sm uppercase tracking-wider"
  
  // Menambahkan variasi danger, success, dan secondary agar sinkron dengan halaman Profile
  const variants = {
    primary: "bg-[#F875AA] text-white hover:bg-[#f25c95]",
    secondary: "bg-white text-gray-600 border-2 border-gray-100 hover:bg-gray-50",
    success: "bg-emerald-500 text-white hover:bg-emerald-600",
    danger: "bg-rose-500 text-white hover:bg-rose-600",
    disabled: "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
  }

  const selectVariant = disabled ? variants.disabled : (variants[type] || variants.primary)

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${selectVariant}`}>
      {icon && <span className="text-sm">{icon}</span>}
      {children}
    </button>
  )
}