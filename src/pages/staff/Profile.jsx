import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import ProfileCard from '../../components/ProfileCard.jsx'
import TeachingDetails from '../../components/TeachingDetails.jsx'
import RecentActivity from '../../components/RecentActivity.jsx'

export default function Profile(){
  const { user, logout } = useAuth()
  const [name, setName] = useState(user?.name || 'Staff User')
  const [dept, setDept] = useState('Computer Science')
  const [contact, setContact] = useState('99999 99999')
  const [password, setPassword] = useState('')

  const save = (e) => {
    e.preventDefault()
    alert('Profile saved (demo)')
  }

  const changePw = (e) => {
    e.preventDefault()
    alert('Password updated (demo)')
    setPassword('')
  }

  return (
    <div className="space-y-6">
      <ProfileCard name={name} email={user?.email || 'staff@demo.com'} department={dept} role="Staff" onEdit={()=>{}} onLogout={logout} />

      <TeachingDetails />

      <RecentActivity />

      <form onSubmit={save} className="bg-white rounded-xl shadow-md p-6 max-w-xl space-y-3">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Edit Profile</h2>
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Name</div>
          <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2" value={name} onChange={(e)=>setName(e.target.value)} />
        </label>
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Department</div>
          <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2" value={dept} onChange={(e)=>setDept(e.target.value)} />
        </label>
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Contact</div>
          <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2" value={contact} onChange={(e)=>setContact(e.target.value)} />
        </label>
        <div className="pt-2">
          <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Save Changes</button>
        </div>
      </form>

      <form onSubmit={changePw} className="bg-white rounded-xl shadow-md p-6 max-w-xl space-y-3">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Security</h2>
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">New Password</div>
          <input type="password" className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter new password" />
        </label>
        <div className="pt-2 flex gap-2">
          <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Change Password</button>
          <button type="button" onClick={logout} className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200">Logout</button>
        </div>
      </form>
    </div>
  )
}


