import React from 'react'
import { motion } from 'framer-motion'

function Card({ title, value, icon }){
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <div className="text-3xl">{icon}</div>
    </motion.div>
  )
}

export default function AdminDashboard(){
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total Staffs" value={48} icon="👩‍🏫" />
        <Card title="Total Students" value={1200} icon="👨‍🎓" />
        <Card title="Attendance Records" value={54210} icon="🗂️" />
        <Card title="Pending Leaves" value={7} icon="📝" />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-lg font-semibold mb-3">Quick Actions</div>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Staff</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Student</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Generate Report</button>
        </div>
      </div>
    </div>
  )
}

















