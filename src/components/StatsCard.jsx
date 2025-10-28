import React from 'react'
import { motion } from 'framer-motion'

export default function StatsCard({ title, value, sub, accent = 'indigo', flashing = false }){
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className={`bg-white rounded-2xl shadow-lg p-5 border border-${accent}-100`}
      style={flashing ? { animation: 'flash 1.2s infinite' } : undefined}
    >
      <div className="text-sm text-gray-500">{title}</div>
      <div className={`text-2xl font-semibold mt-1 text-${accent}-700`}>{value}</div>
      {sub ? <div className="text-xs text-gray-500">{sub}</div> : null}
      <style>{`@keyframes flash { 0%,100%{ box-shadow: 0 0 0 0 rgba(239,68,68,0.0)} 50% { box-shadow: 0 0 0 6px rgba(239,68,68,0.15)} }`}</style>
    </motion.div>
  )
}


















