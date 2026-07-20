import { notFound } from 'next/navigation'
import { SiteShell } from '@/components/layout/site-shell'
import { ProfileClient } from '@/components/helpers/profile-client'
import { getHelperById, getReviewsForHelper, helpers } from '@/lib/data'
import { db } from '@/lib/db'
import { helpersTable, reviewsTable } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import type { Helper, Review, ServiceType, VerificationStatus } from '@/types'

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
  if (!helper) return { title: 'Helper not found | Helper4U' }
  return {
    title: `${helper.name} - ${helper.serviceLabel} | Helper4U`,
    description: helper.bio,
  }
}

export default async function HelperProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let helper = getHelperById(id)
  let reviews = getReviewsForHelper(id)

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

        const dbReviews = await db.select().from(reviewsTable).where(eq(reviewsTable.helperId, id))
        if (dbReviews.length > 0) {
          reviews = dbReviews.map((r) => ({
            id: r.id,
            author: r.author,
            avatar: r.avatar,
            rating: r.rating,
            date: r.date,
            comment: r.comment,
            helperId: r.helperId,
            helperName: r.helperName,
          }))
        }
      }
    }
  } catch (error) {
    console.error('Failed to load helper profile details from database, falling back to static data', error)
  }

  if (!helper) notFound()

  return (
    <SiteShell>
      <ProfileClient helper={helper} reviews={reviews} />
    </SiteShell>
  )
}
