import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function StudentProfile() {
  const { user, logout } = useAuth()
  const [password, setPassword] = useState('')
  const profile = user || { name: 'Student Name', email: 'student@demo.com', course: 'B.Sc Computer Science', roll: 'CS-2023-042' }

  const onChangePassword = (e) => {
    e.preventDefault()
    alert('Password updated (demo)')
    setPassword('')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold mb-4">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Name</div>
            <div className="font-medium">{profile.name || 'Student'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-medium">{profile.email}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Course</div>
            <div className="font-medium">{profile.course}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Roll Number</div>
            <div className="font-medium">{profile.roll}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold mb-4">Security</h2>
        <form onSubmit={onChangePassword} className="max-w-md space-y-3">
          <label className="block">
            <div className="text-sm text-gray-600 mb-1">New Password</div>
            <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter new password" />
          </label>
          <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Update Password</button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold mb-2">Session</h2>
        <button onClick={logout} className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200">Log out</button>
      </div>
    </div>
  )
}


















