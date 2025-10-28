import React from 'react'
import { motion } from 'framer-motion'

const items = [
  { icon: '✅', text: 'Marked attendance for CS-301', time: '2 hours ago' },
  { icon: '✅', text: 'Approved leave request from Alex Johnson', time: '4 hours ago' },
  { icon: '🎓', text: 'Conducted Database Systems lecture', time: '1 day ago' },
  { icon: '❌', text: 'Rejected leave request (insufficient documentation)', time: '2 days ago' },
]

export default function RecentActivity(){
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="bg-white shadow-md rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 border-l border-gray-200" />
        <ul className="space-y-3">
          {items.map((it, idx) => (
            <motion.li key={idx} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx*0.05 }}
              className="relative pl-12 pr-4 py-3 rounded-lg hover:bg-gray-50">
              <div className="absolute left-2 top-4 w-4 h-4 rounded-full bg-white border flex items-center justify-center text-xs">
                <span className="select-none">{it.icon}</span>
              </div>
              <div className="text-gray-800">{it.text}</div>
              <div className="text-xs text-gray-500">{it.time}</div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

















