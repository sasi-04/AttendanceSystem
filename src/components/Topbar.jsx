import React from 'react'

export default function Topbar({ name = '', role = '', right = null }) {
  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">Welcome{ name ? `, ${name}` : ''}</h1>
        {role ? <p className="text-sm text-gray-500">Role: {role}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        {right}
      </div>
    </header>
  )
}


















