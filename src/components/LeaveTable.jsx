import React, { useMemo, useState } from 'react'

export default function LeaveTable(){
  const [status, setStatus] = useState('All')
  const [requests, setRequests] = useState([
    { id: 1, name: 'Alice Johnson', dates: '2025-09-28 to 2025-09-29', reason: 'Medical', status: 'Pending' },
    { id: 2, name: 'Rahul Singh', dates: '2025-08-12', reason: 'Family', status: 'Approved' },
    { id: 3, name: 'Maria Garcia', dates: '2025-07-01', reason: 'Travel', status: 'Rejected' },
  ])

  const filtered = useMemo(()=> requests.filter(r => status==='All' || r.status===status), [status, requests])

  const update = (id, next) => setRequests(reqs => reqs.map(r => r.id===id ? { ...r, status: next } : r))

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-lg">Leave Requests</div>
        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="px-3 py-2 rounded-md border border-gray-200 bg-gray-50">
          {['All','Pending','Approved','Rejected'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-gray-600">
            <tr>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Dates</th>
              <th className="py-2 pr-4">Reason</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(r => (
              <tr key={r.id}>
                <td className="py-2 pr-4">{r.name}</td>
                <td className="py-2 pr-4">{r.dates}</td>
                <td className="py-2 pr-4">{r.reason}</td>
                <td className="py-2 pr-4">
                  <span className={`px-2 py-1 rounded text-xs ${r.status==='Pending'?'bg-yellow-50 text-yellow-700': r.status==='Approved'?'bg-green-50 text-green-700':'bg-red-50 text-red-700'}`}>{r.status}</span>
                </td>
                <td className="py-2 pr-4 space-x-2">
                  <button onClick={()=>update(r.id, 'Approved')} className="px-2 py-1 rounded-md border text-xs">Approve</button>
                  <button onClick={()=>update(r.id, 'Rejected')} className="px-2 py-1 rounded-md border text-xs">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


















