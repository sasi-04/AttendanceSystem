import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function StudentLayout() {
  const { user, logout } = useAuth()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <aside className="w-64 bg-white shadow-sm">
          <div className="px-6 py-5 border-b">
            <div className="text-xl font-bold">Attendance</div>
            <div className="text-sm text-gray-500">Student Portal</div>
          </div>
          <nav className="p-4 space-y-1">
            <NavLink to="/student/dashboard" className={({isActive})=>`block px-4 py-2 rounded-lg ${isActive? 'bg-indigo-50 text-indigo-700 font-medium':'text-gray-700 hover:bg-gray-100'}`}>Dashboard</NavLink>
            <NavLink to="/student/attendance" className={({isActive})=>`block px-4 py-2 rounded-lg ${isActive? 'bg-indigo-50 text-indigo-700 font-medium':'text-gray-700 hover:bg-gray-100'}`}>QR Scanner</NavLink>
            <NavLink to="/student/leave" className={({isActive})=>`block px-4 py-2 rounded-lg ${isActive? 'bg-indigo-50 text-indigo-700 font-medium':'text-gray-700 hover:bg-gray-100'}`}>Leave Management</NavLink>
            <NavLink to="/student/profile" className={({isActive})=>`block px-4 py-2 rounded-lg ${isActive? 'bg-indigo-50 text-indigo-700 font-medium':'text-gray-700 hover:bg-gray-100'}`}>Profile</NavLink>
          </nav>
        </aside>

        <main className="flex-1">
          <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">Welcome{user?.name ? `, ${user.name}` : ''}</h1>
              <p className="text-sm text-gray-500">Role: Student</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">{user?.email}</div>
              <button onClick={logout} className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-sm">Logout</button>
            </div>
          </header>
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}


















