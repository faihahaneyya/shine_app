import React from 'react'

export default function DataTable({ title, icon, actionButton, headers, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          {icon && <span className="text-[#F875AA]">{icon}</span>}
          {title}
        </h2>
        {actionButton}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((head, idx) => (
                <th key={idx} className="px-6 py-3 text-sm font-semibold text-gray-600">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  )
}