import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ allow = [] }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login/student" replace />
  if (allow.length > 0 && !allow.includes(user.role)) {
    return <Navigate to="/login/student" replace />
  }
  return <Outlet />
}


















