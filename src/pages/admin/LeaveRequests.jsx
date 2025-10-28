import React, { useMemo, useState } from 'react'

export default function LeaveRequests(){
  const [status, setStatus] = useState('All')
  const [requests, setRequests] = useState([
    { id: 1, name: 'Alice Johnson', role: 'Student', dates: '2025-09-28 to 2025-09-29', reason: 'Medical', status: 'Pending' },
    { id: 2, name: 'Dr. Rahul', role: 'Staff', dates: '2025-08-12', reason: 'Conference', status: 'Approved' },
    { id: 3, name: 'Maria Garcia', role: 'Student', dates: '2025-07-01', reason: 'Travel', status: 'Rejected' },
  ])
  const filtered = useMemo(()=> requests.filter(r => status==='All' || r.status===status), [status, requests])
  const update = (id, next) => setRequests(rs => rs.map(r => r.id===id ? { ...r, status: next } : r))
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold">Leave Requests</div>
        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="px-3 py-2 rounded-md border bg-gray-50">
          {['All','Pending','Approved','Rejected'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm border rounded-lg">
          <thead className="text-gray-600">
            <tr>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Role</th>
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
                <td className="py-2 pr-4">{r.role}</td>
                <td className="py-2 pr-4">{r.dates}</td>
                <td className="py-2 pr-4">{r.reason}</td>
                <td className="py-2 pr-4">{r.status}</td>
                <td className="py-2 pr-4 space-x-2">
                  <button onClick={()=>update(r.id,'Approved')} className="px-2 py-1 rounded-md border text-xs">Approve</button>
                  <button onClick={()=>update(r.id,'Rejected')} className="px-2 py-1 rounded-md border text-xs">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

















