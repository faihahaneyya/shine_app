import React from 'react'

export default function Avatar({ initial = "B" }) {
  return (
    <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-[#F875AA] via-[#FFF5E4] to-[#AEDEFC] flex items-center justify-center text-white font-bold text-3xl shadow-md select-none">
      {initial}
    </div>
  )
}