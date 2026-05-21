import React from 'react'
import { FiX } from 'react-icons/fi'

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 overflow-hidden animate-scale-in shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <span className="text-sm font-semibold text-gray-700">{title}</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 bg-gray-200 p-1.5 rounded-full transition-colors">
            <FiX />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}