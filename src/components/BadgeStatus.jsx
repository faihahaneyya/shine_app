import React from 'react'

export default function BadgeStatus({ status }) {
  const getColors = (val) => {
    switch(val) {
      case 'Active': case 'Regular': return 'bg-green-100 text-green-600'
      case 'Paused': case 'Gold': return 'bg-yellow-100 text-yellow-600'
      case 'Canceled': case 'Bronze': return 'bg-amber-100 text-amber-700'
      case 'VIP': return 'bg-pink-100 text-pink-700'
      case 'New': return 'bg-blue-100 text-blue-700'
      case 'Diamond': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${getColors(status)}`}>
      {status}
    </span>
  )
}