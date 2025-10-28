import React, { useMemo, useState } from 'react'

export default function StudentTable(){
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState('All')
  const [minAtt, setMinAtt] = useState(0)
  const [maxAtt, setMaxAtt] = useState(100)

  const data = [
    { name: 'Alice Johnson', roll: 'CS-2023-001', dept: 'CS', contact: 'alice@example.com', attendance: 92, lastSeen: '09:00 AM' },
    { name: 'Rahul Singh', roll: 'EE-2023-014', dept: 'EE', contact: 'rahul@example.com', attendance: 68, lastSeen: '08:55 AM' },
    { name: 'Maria Garcia', roll: 'ME-2023-021', dept: 'ME', contact: 'maria@example.com', attendance: 79, lastSeen: '08:50 AM' },
  ]

  const filtered = useMemo(()=>{
    const q = query.toLowerCase()
    return data.filter(s=>
      (dept==='All' || s.dept===dept) &&
      s.attendance >= minAtt && s.attendance <= maxAtt &&
      (s.name.toLowerCase().includes(q) || s.contact.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q))
    )
  },[query, dept, minAtt, maxAtt])

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="font-semibold text-lg">Students</div>
        <div className="flex gap-2 items-center">
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search name/email/roll" className="px-3 py-2 rounded-md border border-gray-200 bg-gray-50 w-64" />
          <select value={dept} onChange={(e)=>setDept(e.target.value)} className="px-3 py-2 rounded-md border border-gray-200 bg-gray-50">
            {['All','CS','EE','ME'].map(d=> <option key={d}>{d}</option>)}
          </select>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>Attendance</span>
            <input type="number" value={minAtt} onChange={(e)=>setMinAtt(Number(e.target.value)||0)} className="w-16 px-2 py-1 border rounded" />
            <span>-</span>
            <input type="number" value={maxAtt} onChange={(e)=>setMaxAtt(Number(e.target.value)||100)} className="w-16 px-2 py-1 border rounded" />
            <span>%</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-gray-600">
            <tr>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Roll Number</th>
              <th className="py-2 pr-4">Department</th>
              <th className="py-2 pr-4">Contact</th>
              <th className="py-2 pr-4">Attendance %</th>
              <th className="py-2 pr-4">Last Seen</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(s => (
              <tr key={s.roll}>
                <td className="py-2 pr-4">{s.name}</td>
                <td className="py-2 pr-4">{s.roll}</td>
                <td className="py-2 pr-4">{s.dept}</td>
                <td className="py-2 pr-4">{s.contact}</td>
                <td className="py-2 pr-4">{s.attendance}%</td>
                <td className="py-2 pr-4">{s.lastSeen}</td>
                <td className="py-2 pr-4"><button className="px-2 py-1 rounded-md border text-xs">View Profile</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


















