import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminSidebar({ items, collapsed=false, onToggle }){
  return (
    <aside className={`${collapsed? 'w-20':'w-64'} bg-white dark:bg-gray-900 shadow-sm transition-all`}>
      <div className="px-6 py-5 border-b">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">Attendance</div>
            {!collapsed && <div className="text-sm text-gray-500">Admin Panel</div>}
          </div>
          <button onClick={onToggle} className="text-sm px-2 py-1 rounded border">{collapsed? '›':'‹'}</button>
        </div>
      </div>
      <nav className="p-4 space-y-1">
        {items.map(it => (
          <NavLink key={it.to} to={it.to} className={({isActive})=>`flex items-center gap-2 px-4 py-2 rounded-lg ${isActive? 'bg-indigo-50 text-indigo-700 font-medium':'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
            <span className="shrink-0">{it.icon}</span>
            {!collapsed && <span className="truncate">{it.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}


