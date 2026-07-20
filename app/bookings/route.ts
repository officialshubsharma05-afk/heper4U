import { NextResponse } from 'next/server'
import { bookings as mockBookings } from '@/lib/data'
import { db } from '@/lib/db'
import { bookings as bookingsTable } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import type { Booking } from '@/types'

export async function GET() {
  let results: Booking[] = mockBookings
  try {
    if (process.env.DATABASE_URL) {
      const rows = await db.select().from(bookingsTable).orderBy(desc(bookingsTable.createdAt))
      if (rows.length > 0) {
        results = rows.map((r) => ({
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
    }
  } catch (error) {
    console.error('Failed to query database for bookings API, falling back to static data', error)
  }
  return NextResponse.json({ bookings: results })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body?.helperId) {
    return NextResponse.json(
      { error: 'helperId is required' },
      { status: 400 },
    )
  }

  let booking: Booking = {
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'pending' as const,
    helperId: body.helperId,
    helperName: body.helperName || 'Helper',
    helperAvatar: body.helperAvatar || '',
    service: body.service || 'General Help',
    plan: body.plan || 'hourly',
    date: body.date || '',
    time: body.time || '',
    duration: body.duration || '',
    address: body.address || '',
    amount: body.amount || 0,
    customerName: body.customerName || 'Customer',
  }

  try {
    if (process.env.DATABASE_URL) {
      const [row] = await db
        .insert(bookingsTable)
        .values({
          code: booking.id,
          userId: body.userId || 'anonymous',
          customerName: booking.customerName,
          phone: body.phone || null,
          helperId: booking.helperId,
          helperName: booking.helperName,
          helperAvatar: booking.helperAvatar || null,
          service: booking.service,
          plan: booking.plan,
          amount: Math.round(booking.amount),
          date: booking.date || null,
          time: booking.time || null,
          duration: booking.duration || null,
          address: booking.address || null,
          notes: body.notes || null,
          status: 'pending',
        })
        .returning()

      if (row) {
        booking = {
          id: row.code,
          helperId: row.helperId,
          helperName: row.helperName,
          helperAvatar: row.helperAvatar ?? '',
          service: row.service,
          plan: (row.plan as any) || 'hourly',
          date: row.date ?? '',
          time: row.time ?? '',
          duration: row.duration ?? '',
          address: row.address ?? '',
          amount: row.amount,
          status: row.status as Booking['status'],
          customerName: row.customerName,
        }
      }
    }
  } catch (error) {
    console.error('Failed to insert booking into database via API, falling back to mock response', error)
  }

  return NextResponse.json({ booking }, { status: 201 })
}
