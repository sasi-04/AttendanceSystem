import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ items = [], title = 'Attendance', subtitle = '' }) {
  return (
    <aside className="w-64 bg-white shadow-sm">
      <div className="px-6 py-5 border-b">
        <div className="text-xl font-bold">{title}</div>
        {subtitle ? <div className="text-sm text-gray-500">{subtitle}</div> : null}
      </div>
      <nav className="p-4 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg ${
                isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}


















