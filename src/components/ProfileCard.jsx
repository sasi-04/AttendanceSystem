import React from 'react'
import { motion } from 'framer-motion'

export default function ProfileCard({ name, email, department, role, onEdit, onLogout }){
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="bg-white shadow-md rounded-xl p-6 mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xl font-semibold">
          {name?.[0]?.toUpperCase() || 'S'}
        </div>
        <div>
          <div className="text-xl font-semibold text-gray-800">{name}</div>
          <div className="text-gray-600">{email}</div>
          <div className="text-sm text-gray-500">{department} • {role}</div>
        </div>
      </div>
      <div className="flex gap-2">
        {onEdit && <button onClick={onEdit} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Edit Profile</button>}
        {onLogout && <button onClick={onLogout} className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200">Logout</button>}
      </div>
    </motion.div>
  )
}

















