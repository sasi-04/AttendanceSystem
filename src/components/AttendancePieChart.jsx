import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const COLORS = ['#ef4444','#f59e0b','#eab308','#22c55e','#3b82f6']

export default function AttendancePieChart(){
  const data = [
    { name: '<60%', value: 5 },
    { name: '60–69%', value: 12 },
    { name: '70–79%', value: 18 },
    { name: '80–89%', value: 30 },
    { name: '90–100%', value: 35 },
  ]

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="bg-white rounded-2xl shadow-lg p-5">
      <div className="font-semibold mb-3">Attendance Distribution</div>
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={110} isAnimationActive>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}


















