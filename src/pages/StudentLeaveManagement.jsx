import React, { useMemo, useState } from 'react'

const initialLeaves = [
  { id: 1, name: 'You', duration: '2025-09-28 to 2025-09-29', reason: 'Medical', status: 'Pending', submitted: '2025-09-20' },
  { id: 2, name: 'You', duration: '2025-08-12', reason: 'Family', status: 'Approved', submitted: '2025-08-05' },
  { id: 3, name: 'You', duration: '2025-07-01', reason: 'Travel', status: 'Rejected', submitted: '2025-06-25' },
]

export default function StudentLeaveManagement() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const leaves = useMemo(() => {
    return initialLeaves.filter((l) => {
      const q = query.toLowerCase()
      const matchesQuery = l.reason.toLowerCase().includes(q) || l.duration.toLowerCase().includes(q)
      const matchesStatus = status === 'All' || l.status === status
      return matchesQuery && matchesStatus
    })
  }, [query, status])

  const stats = {
    Pending: initialLeaves.filter(l=>l.status==='Pending').length,
    Approved: initialLeaves.filter(l=>l.status==='Approved').length,
    Rejected: initialLeaves.filter(l=>l.status==='Rejected').length,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(stats).map(([k,v]) => (
          <div key={k} className="bg-white rounded-xl shadow-sm p-5">
            <div className="text-sm text-gray-500">{k}</div>
            <div className="text-2xl font-semibold mt-1">{v}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div className="font-semibold text-lg">Leave Applications</div>
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Search by reason or duration"
              className="px-3 py-2 rounded-md border border-gray-200 bg-gray-50 w-64"
            />
            <select value={status} onChange={(e)=>setStatus(e.target.value)} className="px-3 py-2 rounded-md border border-gray-200 bg-gray-50">
              {['All','Pending','Approved','Rejected'].map(s=> <option key={s}>{s}</option>)}
            </select>
            <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">+ Apply for Leave</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-gray-600">
              <tr>
                <th className="py-2 pr-4">Student</th>
                <th className="py-2 pr-4">Duration</th>
                <th className="py-2 pr-4">Reason</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Submitted</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {leaves.map(l => (
                <tr key={l.id}>
                  <td className="py-2 pr-4">{l.name}</td>
                  <td className="py-2 pr-4">{l.duration}</td>
                  <td className="py-2 pr-4">{l.reason}</td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-1 rounded text-xs ${l.status==='Pending'?'bg-yellow-50 text-yellow-700': l.status==='Approved'?'bg-green-50 text-green-700':'bg-red-50 text-red-700'}`}>{l.status}</span>
                  </td>
                  <td className="py-2 pr-4">{l.submitted}</td>
                  <td className="py-2 pr-4">
                    <button className="px-2 py-1 rounded-md border text-xs">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


















