import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('ams_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('ams_user')
      }
    }
  }, [])

  const login = (payload) => {
    setUser(payload)
    localStorage.setItem('ams_user', JSON.stringify(payload))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ams_user')
  }

  const value = useMemo(() => ({ user, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function useRedirectByRole() {
  const navigate = useNavigate()
  return (role) => {
    if (role === 'student') navigate('/student/dashboard', { replace: true })
    else if (role === 'staff') navigate('/staff/dashboard', { replace: true })
    else if (role === 'admin') navigate('/admin/dashboard', { replace: true })
    else navigate('/', { replace: true })
  }
}

















