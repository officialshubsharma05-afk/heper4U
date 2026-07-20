import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'
import { seedDatabaseIfNeeded } from './seed'

export const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool, { schema })

if (process.env.DATABASE_URL) {
  seedDatabaseIfNeeded().catch((err) => {
    console.error('Database seeding error:', err)
  })
}

