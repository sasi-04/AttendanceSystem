import React, { useState } from 'react'

export default function Settings(){
  const [name, setName] = useState('Admin User')
  const [email, setEmail] = useState('admin@demo.com')
  const [semester, setSemester] = useState('2025-08-01 to 2025-12-20')
  const [departments, setDepartments] = useState('CS, EE, ME')

  const save = (e) => {
    e.preventDefault()
    alert('Settings saved (demo)')
  }

  return (
    <div className="space-y-6">
      <form onSubmit={save} className="bg-white rounded-xl shadow-md p-6 max-w-2xl space-y-3">
        <div className="text-lg font-semibold mb-2">Admin Profile</div>
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Name</div>
          <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2" value={name} onChange={(e)=>setName(e.target.value)} />
        </label>
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Email</div>
          <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </label>
        <div className="text-lg font-semibold mt-4">System Settings</div>
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Semester Dates</div>
          <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2" value={semester} onChange={(e)=>setSemester(e.target.value)} />
        </label>
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">Departments</div>
          <input className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2" value={departments} onChange={(e)=>setDepartments(e.target.value)} />
        </label>
        <div className="pt-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
        </div>
      </form>
    </div>
  )
}

















