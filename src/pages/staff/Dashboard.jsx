import React from 'react'

export default function Dashboard(){
  const stats = [
    { label: 'Total Students', value: 1200 },
    { label: 'Present Today', value: 1120, sub: '93%' },
    { label: 'Absent Today', value: 80 },
  ]
  const average = 92
  const lowAttendance = [
    { name: 'Alice Johnson', percentage: 68 },
    { name: 'Rahul Singh', percentage: 71 },
    { name: 'Maria Garcia', percentage: 74 },
  ]
  const recentActivity = [
    { name: 'John Doe', time: '08:45 AM', status: 'Checked In' },
    { name: 'Jane Doe', time: '08:43 AM', status: 'Checked In' },
    { name: 'Alex Kim', time: '08:40 AM', status: 'Checked In' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm p-5">
            <div className="text-sm text-gray-500">{s.label}</div>
            <div className="text-2xl font-semibold mt-1">{s.value}</div>
            {s.sub && <div className="text-xs text-gray-500">{s.sub}</div>}
          </div>
        ))}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="text-sm text-gray-500">Average Attendance</div>
          <div className="text-2xl font-semibold mt-1">{average}%</div>
          <div className="h-3 bg-gray-100 rounded mt-3">
            <div className="h-3 bg-green-500 rounded" style={{ width: `${average}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Low Attendance Alert</h2>
            <span className="text-sm text-gray-500">Below 75%</span>
          </div>
          <div className="divide-y">
            {lowAttendance.map((s) => (
              <div key={s.name} className="py-3 flex items-center justify-between">
                <div className="font-medium text-gray-800">{s.name}</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 rounded-md border text-xs">View Profile</button>
                  <div className="px-2 py-1 rounded text-xs bg-red-50 text-red-600 font-medium">{s.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold mb-3">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((a, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="text-gray-800">{a.name}</div>
                <div className="text-sm text-gray-500">{a.time}</div>
                <div className="px-2 py-1 rounded text-xs bg-indigo-50 text-indigo-700">{a.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold mb-3">Pending Leave Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-gray-600">
              <tr>
                <th className="py-2 pr-4">Student</th>
                <th className="py-2 pr-4">Duration</th>
                <th className="py-2 pr-4">Reason</th>
                <th className="py-2 pr-4">Submitted</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 pr-4">You</td>
                <td className="py-2 pr-4">2 days</td>
                <td className="py-2 pr-4">Medical</td>
                <td className="py-2 pr-4">2025-09-20</td>
                <td className="py-2 pr-4">
                  <span className="px-2 py-1 rounded text-xs bg-yellow-50 text-yellow-700">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


















