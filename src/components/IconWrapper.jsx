import React from 'react'

export default function IconWrapper({ icon, color = 'from-blue-500 to-blue-600' }) {
  return (
    <div className={`bg-gradient-to-br ${color} p-3 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
  )
}