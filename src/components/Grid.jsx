import React from 'react'

export default function Grid({ children, cols = '4' }) {
  const columnStyles = {
    '2': 'grid grid-cols-1 md:grid-cols-2 gap-6',
    '3': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5',
    '4': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
  }

  return (
    <div className={columnStyles[cols] || columnStyles['4']}>
      {children}
    </div>
  )
}