import React from 'react'
import QRGeneratorPanel from '../../components/QRGeneratorPanel.jsx'

export default function Attendance(){
  return (
    <div className="space-y-6">
      <QRGeneratorPanel heading="Live Attendance QR (Staff)" defaultCourseId="COURSE1" />
    </div>
  )
}


















