import React from 'react'

export default function AdminTopbar({ name, role, onLogout, onToggleTheme }){
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Welcome{name ? `, ${name}` : ''}</h1>
        <span className="text-sm text-gray-500">Role: {role}</span>
      </div>
      <div className="flex items-center gap-3">
        <input placeholder="Search..." className="hidden md:block px-3 py-1.5 rounded-md border bg-gray-50 dark:bg-gray-800 dark:border-gray-700" />
        <button title="Notifications" className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">🔔</button>
        <button title="Messages" className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">💬</button>
        <button onClick={onToggleTheme} className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">🌓</button>
        <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center">A</div>
        <button onClick={onLogout} className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm">Logout</button>
      </div>
    </header>
  )
}


