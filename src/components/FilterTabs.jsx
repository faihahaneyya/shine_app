import React from 'react'

export default function FilterTabs({ items, activeItem, onItemSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {items.map(item => (
        <button
          key={item}
          onClick={() => onItemSelect(item)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
            activeItem === item
              ? 'bg-gradient-to-r from-[#F875AA] to-[#AEDEFC] text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-[#FDEDED] hover:text-[#F875AA]'
          }`}
        >
          {item === 'all' ? 'All Tiers' : item}
        </button>
      ))}
    </div>
  )
}