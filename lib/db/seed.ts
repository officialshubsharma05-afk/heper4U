import { db } from './index'
import * as schema from './schema'

export async function seedDatabaseIfNeeded() {
  try {
    const helpersCount = await db.select().from(schema.helpersTable).limit(1)
    if (helpersCount.length === 0) {
      console.log('Database helpers table is empty. Starting seeding process...')
      
      const { helpers: seedHelpers, reviews: seedReviews } = await import('../data')

      // Seed helpers
      for (const h of seedHelpers) {
        await db.insert(schema.helpersTable).values({
          id: h.id,
          name: h.name,
          avatar: h.avatar,
          service: h.service,
          serviceLabel: h.serviceLabel,
          bio: h.bio,
          city: h.city,
          experienceYears: h.experienceYears,
          rating: h.rating,
          reviewCount: h.reviewCount,
          hourlyRate: h.pricing.hourly,
          monthlyRate: h.pricing.monthly,
          yearlyRate: h.pricing.yearly,
          skills: h.skills,
          languages: h.languages,
          availability: h.availability,
          verification: h.verification,
          completedJobs: h.completedJobs,
          responseTime: h.responseTime,
          gender: h.gender,
        })
      }

      // Seed reviews
      for (const r of seedReviews) {
        await db.insert(schema.reviewsTable).values({
          id: r.id,
          author: r.author,
          avatar: r.avatar || '',
          rating: r.rating,
          date: r.date,
          comment: r.comment,
          helperId: r.helperId,
          helperName: r.helperName,
        })
      }

      console.log('Seeding completed successfully!')
    }
  } catch (error) {
    console.error('Seeding check skipped (tables might not exist yet):', error)
  }
}
