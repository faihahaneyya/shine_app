import React from 'react'

export default function PageContainer({ children }) {
  return (
    <div className="space-y-6 animate-fade-in-up bg-gray-50 min-h-screen p-6">
      {children}
    </div>
  )
}