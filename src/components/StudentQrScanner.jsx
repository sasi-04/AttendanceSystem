import React, { useEffect, useState } from 'react'

export default function StudentQrScanner(props){
  const [ScannerComp, setScannerComp] = useState(null)
  useEffect(() => {
    let mounted = true
    import('@yudiel/react-qr-scanner')
      .then((m) => {
        const C = m?.QrScanner || m?.default || null
        if (mounted) setScannerComp(() => C)
      })
      .catch(() => {
        if (mounted) setScannerComp(() => null)
      })
    return () => { mounted = false }
  }, [])

  if (!ScannerComp) return <div className="p-4 text-center text-sm text-gray-600">Loading scanner…</div>
  return <ScannerComp {...props} />
}





