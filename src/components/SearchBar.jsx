import React from 'react'
import { FiSearch } from 'react-icons/fi'

export default function SearchBar({ placeholder, value, onChange }) {
  return (
    <div className="flex-1 relative group">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F875AA] transition-colors" />
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#F875AA] focus:border-transparent focus:bg-white transition-all duration-300" 
      />
    </div>
  )
}