import type { Metadata } from 'next'
import { AdminDashboard } from '@/components/dashboard/admin-dashboard'
import { bookings as mockBookings, helpers as mockHelpers, platformUsers as mockUsers } from '@/lib/data'
import { db } from '@/lib/db'
import { bookings as bookingsTable, helpersTable, user as userTable } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import type { Booking, Helper, PlatformUser, ServiceType, VerificationStatus, UserRole } from '@/types'

export const metadata: Metadata = {
  title: 'Admin console | Helper4U',
}

export default async function AdminPage() {
  let dbBookings: Booking[] = mockBookings
  let dbHelpers: Helper[] = mockHelpers
  let dbUsers: PlatformUser[] = mockUsers

  try {
    if (process.env.DATABASE_URL) {
      // 1. Fetch bookings
      const rows = await db.select().from(bookingsTable).orderBy(desc(bookingsTable.createdAt))
      if (rows.length > 0) {
        dbBookings = rows.map((r) => ({
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
      }

      // 2. Fetch helpers
      const helperRows = await db.select().from(helpersTable)
      if (helperRows.length > 0) {
        dbHelpers = helperRows.map((h) => ({
          id: h.id,
          name: h.name,
          avatar: h.avatar,
          service: h.service as ServiceType,
          serviceLabel: h.serviceLabel,
          bio: h.bio,
          city: h.city,
          experienceYears: h.experienceYears,
          rating: h.rating,
          reviewCount: h.reviewCount,
          pricing: {
            hourly: h.hourlyRate,
            monthly: h.monthlyRate,
            yearly: h.yearlyRate,
          },
          skills: h.skills,
          languages: h.languages,
          availability: h.availability,
          verification: h.verification as VerificationStatus,
          completedJobs: h.completedJobs,
          responseTime: h.responseTime,
          gender: h.gender as 'female' | 'male',
        }))
      }

      // 3. Fetch users
      const userRows = await db.select().from(userTable)
      if (userRows.length > 0) {
        dbUsers = userRows.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: (u.role as UserRole) || 'user',
          city: 'New York', // default fallback
          joined: u.createdAt.toISOString().split('T')[0],
          bookings: 0,
          status: 'active',
          avatar: u.image ?? '',
        }))
      }
    }
  } catch (error) {
    console.error('Failed to query database for admin stats, falling back to static data', error)
  }

  return (
    <AdminDashboard
      bookings={dbBookings}
      helpers={dbHelpers}
      platformUsers={dbUsers}
    />
  )
}
