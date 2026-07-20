'use client'

import Link from 'next/link'
import {
  LayoutDashboard,
  CalendarDays,
  Heart,
  Settings,
  CreditCard,
  Search,
  ArrowRight,
} from 'lucide-react'
import { DashboardShell, StatCard } from '@/components/dashboard/dashboard-shell'
import { BookingsTable } from '@/components/dashboard/bookings-table'
import { HelperCard } from '@/components/helpers/helper-card'
import { Button } from '@/components/ui/button'
import { helpers } from '@/lib/data'
import type { Booking } from '@/types'

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My bookings', href: '/dashboard', icon: CalendarDays },
  { label: 'Saved helpers', href: '/dashboard', icon: Heart },
  { label: 'Payments', href: '/dashboard', icon: CreditCard },
  { label: 'Settings', href: '/dashboard', icon: Settings },
]

interface UserDashboardProps {
  userName: string
  bookings: Booking[]
}

export function UserDashboard({ userName, bookings }: UserDashboardProps) {
  const active = bookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'in-progress',
  ).length
  const totalSpent = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.amount, 0)
  const saved = helpers.slice(0, 3)

  const firstName = userName ? userName.split(' ')[0] : 'User'

  return (
    <DashboardShell
      navItems={navItems}
      activeHref="/dashboard"
      roleLabel="My account"
      userName={userName || 'User'}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-2xl font-bold">
              Welcome back, {firstName}
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your household help.
            </p>
          </div>
          <Button render={<Link href="/browse" />}>
            <Search className="size-4" />
            Find a helper
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={CalendarDays}
            label="Active bookings"
            value={`${active}`}
            hint="Confirmed or in progress"
          />
          <StatCard
            icon={LayoutDashboard}
            label="Total bookings"
            value={`${bookings.length}`}
          />
          <StatCard
            icon={Heart}
            label="Saved helpers"
            value={`${saved.length}`}
          />
          <StatCard
            icon={CreditCard}
            label="Total spent"
            value={`$${totalSpent.toLocaleString()}`}
          />
        </div>

        <section>
          <h3 className="mb-4 font-heading text-lg font-semibold">
            Recent bookings
          </h3>
          <BookingsTable bookings={bookings} />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold">
              Saved helpers
            </h3>
            <Button variant="ghost" size="sm" render={<Link href="/browse" />}>
              Browse more
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((h) => (
              <HelperCard key={h.id} helper={h} />
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  )
}
