import React from 'react'

export default function LoadingSkeleton({ text = "Loading data..." }) {
  return (
    <div className="flex items-center justify-center h-96 animate-pulse">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#F875AA] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 font-medium">{text}</p>
      </div>
    </div>
  )
}