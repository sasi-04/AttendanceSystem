import React, { useMemo, useState } from 'react'

export default function AttendanceTable(){
  const [present, setPresent] = useState({})
  const [markAll, setMarkAll] = useState(false)
  const students = [
    { id: 1, name: 'Alice Johnson', roll: 'CS-2023-001' },
    { id: 2, name: 'Rahul Singh', roll: 'EE-2023-014' },
    { id: 3, name: 'Maria Garcia', roll: 'ME-2023-021' },
  ]

  const toggleAll = () => {
    const next = !markAll
    setMarkAll(next)
    const mapping = {}
    students.forEach(s=> mapping[s.id] = next)
    setPresent(mapping)
  }

  const submit = () => {
    const summary = students.map(s => ({ ...s, present: !!present[s.id] }))
    console.log('Saved attendance:', summary)
    alert('Attendance saved (demo)')
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-lg">Mark Attendance</div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={markAll} onChange={toggleAll} />
          <span>Mark All Present</span>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-gray-600">
            <tr>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Roll</th>
              <th className="py-2 pr-4">Present</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.map(s => (
              <tr key={s.id}>
                <td className="py-2 pr-4">{s.name}</td>
                <td className="py-2 pr-4">{s.roll}</td>
                <td className="py-2 pr-4">
                  <input type="checkbox" checked={!!present[s.id]} onChange={(e)=>setPresent(p=>({...p, [s.id]: e.target.checked}))} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button onClick={submit} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Submit Attendance</button>
      </div>
    </div>
  )
}


















