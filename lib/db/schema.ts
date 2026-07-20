import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
  doublePrecision,
} from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  role: text('role').notNull().default('user'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Bookings are per-user. Every read/write is scoped by `userId` (no RLS on
// Neon). Helper details are denormalized onto the row so a booking still shows
// correctly even if the helper catalog changes.

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  code: text('code').notNull(),
  userId: text('userId').notNull(),
  customerName: text('customerName').notNull(),
  phone: text('phone'),
  helperId: text('helperId').notNull(),
  helperName: text('helperName').notNull(),
  helperAvatar: text('helperAvatar'),
  service: text('service').notNull(),
  plan: text('plan').notNull(),
  date: text('date'),
  time: text('time'),
  duration: text('duration'),
  address: text('address'),
  notes: text('notes'),
  amount: integer('amount').notNull().default(0),
  status: text('status').notNull().default('confirmed'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const helpersTable = pgTable('helpers', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  avatar: text('avatar').notNull(),
  service: text('service').notNull(),
  serviceLabel: text('serviceLabel').notNull(),
  bio: text('bio').notNull(),
  city: text('city').notNull(),
  experienceYears: integer('experienceYears').notNull(),
  rating: doublePrecision('rating').notNull().default(0),
  reviewCount: integer('reviewCount').notNull().default(0),
  hourlyRate: integer('hourlyRate').notNull(),
  monthlyRate: integer('monthlyRate').notNull(),
  yearlyRate: integer('yearlyRate').notNull(),
  skills: text('skills').array().notNull(),
  languages: text('languages').array().notNull(),
  availability: text('availability').notNull(),
  verification: text('verification').notNull().default('pending'),
  completedJobs: integer('completedJobs').notNull().default(0),
  responseTime: text('responseTime').notNull(),
  gender: text('gender').notNull(),
})

export const reviewsTable = pgTable('reviews', {
  id: text('id').primaryKey(),
  author: text('author').notNull(),
  avatar: text('avatar').notNull(),
  rating: integer('rating').notNull(),
  date: text('date').notNull(),
  comment: text('comment').notNull(),
  helperId: text('helperId').notNull().references(() => helpersTable.id, { onDelete: 'cascade' }),
  helperName: text('helperName').notNull(),
})

