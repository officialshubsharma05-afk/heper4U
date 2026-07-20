import type { Metadata } from 'next'
import { HelperDashboard } from '@/components/dashboard/helper-dashboard'

export const metadata: Metadata = {
  title: 'Helper portal | Helper4U',
}

export default function HelperPage() {
  return <HelperDashboard />
}
