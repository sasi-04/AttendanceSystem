import React from 'react'

export default function AdminAttendance(){
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-lg font-semibold mb-3">Attendance Reports</div>
        <div className="flex flex-wrap gap-2 mb-4">
          <select className="px-3 py-2 rounded-md border bg-gray-50">
            <option>Select Staff</option>
            <option>Dr. Alice</option>
            <option>Mr. Rahul</option>
          </select>
          <select className="px-3 py-2 rounded-md border bg-gray-50">
            <option>Select Subject</option>
            <option>Database Systems</option>
            <option>Compiler Design</option>
          </select>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Export CSV</button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Export PDF</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm border rounded-lg">
            <thead className="text-gray-600">
              <tr>
                <th className="py-2 pr-4">Student</th>
                <th className="py-2 pr-4">Roll</th>
                <th className="py-2 pr-4">Attendance %</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 pr-4">Alice Johnson</td>
                <td className="py-2 pr-4">CS-2023-001</td>
                <td className="py-2 pr-4">92%</td>
                <td className="py-2 pr-4"><button className="px-2 py-1 rounded-md border text-xs">Reset</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

















