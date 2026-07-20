import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { SiteShell } from '@/components/layout/site-shell'
import { BookingClient } from '@/components/booking/booking-client'
import { getHelperById, helpers } from '@/lib/data'
import { db } from '@/lib/db'
import { helpersTable } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import type { Helper, ServiceType, VerificationStatus } from '@/types'

export function generateStaticParams() {
  return helpers.map((h) => ({ id: h.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let helper = getHelperById(id)
  try {
    if (process.env.DATABASE_URL) {
      const [dbHelper] = await db.select().from(helpersTable).where(eq(helpersTable.id, id))
      if (dbHelper) {
        helper = {
          id: dbHelper.id,
          name: dbHelper.name,
          avatar: dbHelper.avatar,
          service: dbHelper.service as ServiceType,
          serviceLabel: dbHelper.serviceLabel,
          bio: dbHelper.bio,
          city: dbHelper.city,
          experienceYears: dbHelper.experienceYears,
          rating: dbHelper.rating,
          reviewCount: dbHelper.reviewCount,
          pricing: {
            hourly: dbHelper.hourlyRate,
            monthly: dbHelper.monthlyRate,
            yearly: dbHelper.yearlyRate,
          },
          skills: dbHelper.skills,
          languages: dbHelper.languages,
          availability: dbHelper.availability,
          verification: dbHelper.verification as VerificationStatus,
          completedJobs: dbHelper.completedJobs,
          responseTime: dbHelper.responseTime,
          gender: dbHelper.gender as 'female' | 'male',
        }
      }
    }
  } catch (e) {
    // fallback
  }
  return {
    title: helper ? `Book ${helper.name} | Helper4U` : 'Book | Helper4U',
  }
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let helper = getHelperById(id)

  try {
    if (process.env.DATABASE_URL) {
      const [dbHelper] = await db.select().from(helpersTable).where(eq(helpersTable.id, id))
      if (dbHelper) {
        helper = {
          id: dbHelper.id,
          name: dbHelper.name,
          avatar: dbHelper.avatar,
          service: dbHelper.service as ServiceType,
          serviceLabel: dbHelper.serviceLabel,
          bio: dbHelper.bio,
          city: dbHelper.city,
          experienceYears: dbHelper.experienceYears,
          rating: dbHelper.rating,
          reviewCount: dbHelper.reviewCount,
          pricing: {
            hourly: dbHelper.hourlyRate,
            monthly: dbHelper.monthlyRate,
            yearly: dbHelper.yearlyRate,
          },
          skills: dbHelper.skills,
          languages: dbHelper.languages,
          availability: dbHelper.availability,
          verification: dbHelper.verification as VerificationStatus,
          completedJobs: dbHelper.completedJobs,
          responseTime: dbHelper.responseTime,
          gender: dbHelper.gender as 'female' | 'male',
        }
      }
    }
  } catch (error) {
    console.error('Failed to load helper details for checkout booking from database, falling back to static data', error)
  }

  if (!helper) notFound()

  return (
    <SiteShell>
      <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Loading booking details...</div>}>
        <BookingClient helper={helper} />
      </Suspense>
    </SiteShell>
  )
}

