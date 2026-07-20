import { NextResponse } from 'next/server'
import { helpers as mockHelpers } from '@/lib/data'
import { db } from '@/lib/db'
import { helpersTable } from '@/lib/db/schema'
import type { Helper, ServiceType, VerificationStatus } from '@/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const service = searchParams.get('service')
  const city = searchParams.get('city')
  const q = searchParams.get('q')?.toLowerCase()

  let results: Helper[] = mockHelpers
  try {
    if (process.env.DATABASE_URL) {
      const rows = await db.select().from(helpersTable)
      if (rows.length > 0) {
        results = rows.map((h) => ({
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
    }
  } catch (error) {
    console.error('Failed to query database for helpers API, falling back to static data', error)
  }

  if (service) results = results.filter((h) => h.service === service)
  if (city) results = results.filter((h) => h.city === city)
  if (q) {
    results = results.filter((h) =>
      `${h.name} ${h.serviceLabel} ${h.skills.join(' ')}`
        .toLowerCase()
        .includes(q),
    )
  }

  return NextResponse.json({ helpers: results, count: results.length })
}
