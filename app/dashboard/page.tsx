import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getMyBookings } from '@/app/actions/bookings'
import { UserDashboard } from '@/components/dashboard/user-dashboard'
import type { Booking } from '@/types'

export const metadata: Metadata = {
  title: 'Dashboard | Helper4U',
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/login?next=/dashboard')

  let userBookings: Booking[] = []
  try {
    if (process.env.DATABASE_URL) {
      const rows = await getMyBookings()
      userBookings = rows.map((r) => ({
        id: r.code,
        helperId: r.helperId,
        helperName: r.helperName,
        helperAvatar: r.helperAvatar ?? '',
        service: r.service,
        plan: 'hourly',
        date: r.date ?? '',
        time: r.time ?? '',
        duration: r.duration ?? '',
        address: r.address ?? '',
        amount: r.amount,
        status: r.status as Booking['status'],
        customerName: r.customerName,
      }))
    } else {
      const { bookings: mockBookings } = await import('@/lib/data')
      userBookings = mockBookings.map((b) => ({
        ...b,
        customerName: session.user.name,
      }))
    }
  } catch (error) {
    console.error('Failed to load user bookings from database, falling back to static data', error)
    const { bookings: mockBookings } = await import('@/lib/data')
    userBookings = mockBookings.map((b) => ({
      ...b,
      customerName: session.user.name,
    }))
  }

  return <UserDashboard userName={session.user.name} bookings={userBookings} />
}
