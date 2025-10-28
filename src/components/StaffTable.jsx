import React, { useMemo, useState } from 'react'

export default function StaffTable(){
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState('All')
  const [desig, setDesig] = useState('All')

  const data = [
    { name: 'Dr. Alice', email: 'alice@college.edu', department: 'CS', designation: 'Professor', status: 'Active' },
    { name: 'Mr. Rahul', email: 'rahul@college.edu', department: 'EE', designation: 'Assistant Professor', status: 'Active' },
    { name: 'Ms. Maria', email: 'maria@college.edu', department: 'ME', designation: 'Associate Professor', status: 'Inactive' },
  ]

  const filtered = useMemo(()=>{
    const q = query.toLowerCase()
    return data.filter(s =>
      (dept==='All' || s.department===dept) &&
      (desig==='All' || s.designation===desig) &&
      (s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q))
    )
  },[query, dept, desig])

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="text-lg font-semibold">Staff Members</div>
        <div className="flex gap-2">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search name/email" className="px-3 py-2 rounded-md border border-gray-200 bg-gray-50 w-64" />
          <select value={dept} onChange={(e)=>setDept(e.target.value)} className="px-3 py-2 rounded-md border border-gray-200 bg-gray-50">
            {['All','CS','EE','ME'].map(d=> <option key={d}>{d}</option>)}
          </select>
          <select value={desig} onChange={(e)=>setDesig(e.target.value)} className="px-3 py-2 rounded-md border border-gray-200 bg-gray-50">
            {['All','Professor','Associate Professor','Assistant Professor'].map(d=> <option key={d}>{d}</option>)}
          </select>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Staff</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm border rounded-lg">
          <thead className="text-gray-600">
            <tr>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Department</th>
              <th className="py-2 pr-4">Designation</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((s,i)=> (
              <tr key={i}>
                <td className="py-2 pr-4">{s.name}</td>
                <td className="py-2 pr-4">{s.email}</td>
                <td className="py-2 pr-4">{s.department}</td>
                <td className="py-2 pr-4">{s.designation}</td>
                <td className="py-2 pr-4">{s.status}</td>
                <td className="py-2 pr-4 space-x-2">
                  <button className="px-2 py-1 rounded-md border text-xs">Edit</button>
                  <button className="px-2 py-1 rounded-md border text-xs">Delete</button>
                  <button className="px-2 py-1 rounded-md border text-xs">Reset Password</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

















