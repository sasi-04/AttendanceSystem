import React from 'react'
import { motion } from 'framer-motion'
import StatsCard from '../../components/StatsCard.jsx'
import AttendancePieChart from '../../components/AttendancePieChart.jsx'
import DailyTrendChart from '../../components/DailyTrendChart.jsx'
import HourlyBarChart from '../../components/HourlyBarChart.jsx'

export default function Analytics(){
  const totalStudents = 560
  const average = 91
  const totalClasses = 42
  const lowAlerts = 12

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Total Students" value={totalStudents} accent="indigo" />
        <StatsCard title="Average Attendance" value={`${average}%`} sub="Weekly" accent="green" />
        <StatsCard title="Total Classes" value={totalClasses} sub="This Month" accent="blue" />
        <StatsCard title="Low Attendance Alerts" value={lowAlerts} accent="red" flashing={lowAlerts>0} />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AttendancePieChart />
        <DailyTrendChart />
      </div>

      <HourlyBarChart />
    </div>
  )
}

















