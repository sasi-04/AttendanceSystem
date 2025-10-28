import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

export default function HourlyBarChart(){
  const data = ['8:30','9:30','10:30','11:30','12:30','1:30','2:30','3:30','4:30','5:30'].map(t => ({ time: t, pct: 60 + Math.round(Math.random()*35) }))
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white rounded-2xl shadow-lg p-5">
      <div className="font-semibold mb-3">Hourly Attendance Pattern</div>
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0,100]} tickFormatter={(v)=>`${v}%`} />
            <Tooltip formatter={(v)=>[`${v}%`, 'Attendance']} />
            <Bar dataKey="pct" fill="#22c55e" isAnimationActive />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

















