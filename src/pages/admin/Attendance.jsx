import React from 'react'
import QRGeneratorPanel from '../../components/QRGeneratorPanel.jsx'

export default function AdminAttendance(){
  return (
    <div className="space-y-6">
      <QRGeneratorPanel heading="Admin QR Generator" defaultCourseId="COURSE1" />
    </div>
  )
}

















