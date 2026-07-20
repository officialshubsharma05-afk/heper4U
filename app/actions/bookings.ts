'use server'

import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { bookings } from '@/lib/db/schema'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

async function getSessionUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}

export type NewBookingInput = {
  helperId: string
  helperName: string
  helperAvatar?: string
  service: string
  plan: string
  amount: number
  date?: string
  time?: string
  duration?: string
  address?: string
  notes?: string
  customerName?: string
  phone?: string
}

export async function createBooking(input: NewBookingInput) {
  const user = await getSessionUser()

  const code = `BK-${Math.floor(1000 + Math.random() * 9000)}`

  const [row] = await db
    .insert(bookings)
    .values({
      code,
      userId: user.id,
      customerName: input.customerName?.trim() || user.name || 'Customer',
      phone: input.phone ?? null,
      helperId: input.helperId,
      helperName: input.helperName,
      helperAvatar: input.helperAvatar ?? null,
      service: input.service,
      plan: input.plan,
      amount: Math.round(input.amount || 0),
      date: input.date ?? null,
      time: input.time ?? null,
      duration: input.duration ?? null,
      address: input.address ?? null,
      notes: input.notes ?? null,
      status: 'pending',
    })
    .returning()

  revalidatePath('/dashboard')
  return row
}

export async function getMyBookings() {
  const userId = await getUserId()
  return db
    .select()
    .from(bookings)
    .where(eq(bookings.userId, userId))
    .orderBy(desc(bookings.createdAt))
}

export async function cancelBooking(id: number) {
  const userId = await getUserId()
  await db
    .update(bookings)
    .set({ status: 'cancelled' })
    .where(and(eq(bookings.id, id), eq(bookings.userId, userId)))
  revalidatePath('/dashboard')
}
