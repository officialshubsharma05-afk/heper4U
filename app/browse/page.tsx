import { Suspense } from 'react'
import { SiteShell } from '@/components/layout/site-shell'
import { BrowseClient } from '@/components/helpers/browse-client'
import { helpers as mockHelpers } from '@/lib/data'
import { db } from '@/lib/db'
import { helpersTable } from '@/lib/db/schema'
import type { Helper, ServiceType, VerificationStatus } from '@/types'

export const metadata = {
  title: 'Browse Helpers — Helper4U',
  description: 'Search and filter verified maids, nannies, and caregivers.',
}

async function getHelpers(): Promise<Helper[]> {
  let results = mockHelpers
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
    console.error('Failed to fetch helpers from database, falling back to static data', error)
  }
  return results
}

export default async function BrowsePage() {
  const helpersList = await getHelpers()

  return (
    <SiteShell>
      <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Loading helpers...</div>}>
        <BrowseClient helpers={helpersList} />
      </Suspense>
    </SiteShell>
  )
}
