export type ServiceType = 'maid' | 'nanny' | 'babysitter' | 'cook' | 'elder-care'

export type PlanType = 'hourly' | 'monthly' | 'yearly'

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled'

export type UserRole = 'user' | 'helper' | 'admin'

export type VerificationStatus = 'verified' | 'pending' | 'rejected'

export interface Pricing {
  hourly: number
  monthly: number
  yearly: number
}

export interface Review {
  id: string
  author: string
  avatar: string
  rating: number
  date: string
  comment: string
  helperId: string
  helperName: string
}

export interface Helper {
  id: string
  name: string
  avatar: string
  service: ServiceType
  serviceLabel: string
  bio: string
  city: string
  experienceYears: number
  rating: number
  reviewCount: number
  pricing: Pricing
  skills: string[]
  languages: string[]
  availability: string
  verification: VerificationStatus
  completedJobs: number
  responseTime: string
  gender: 'female' | 'male'
}

export interface Category {
  id: ServiceType
  label: string
  description: string
  icon: string
  helperCount: number
}

export interface Booking {
  id: string
  helperId: string
  helperName: string
  helperAvatar: string
  service: string
  plan: PlanType
  date: string
  time: string
  duration: string
  address: string
  amount: number
  status: BookingStatus
  customerName: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  quote: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface PlatformUser {
  id: string
  name: string
  email: string
  role: UserRole
  city: string
  joined: string
  bookings: number
  status: 'active' | 'suspended'
  avatar: string
}
