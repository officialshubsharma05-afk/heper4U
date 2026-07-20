'use client'

import {
  LayoutDashboard,
  CalendarDays,
  Star,
  Wallet,
  Settings,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { DashboardShell, StatCard } from '@/components/dashboard/dashboard-shell'
import { BookingsTable } from '@/components/dashboard/bookings-table'
import { ReviewCard } from '@/components/helpers/review-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { StarRating } from '@/components/shared/star-rating'
import { bookings, reviews, getHelperById } from '@/lib/data'

const navItems = [
  { label: 'Overview', href: '/helper', icon: LayoutDashboard },
  { label: 'Job requests', href: '/helper', icon: CalendarDays },
  { label: 'Reviews', href: '/helper', icon: Star },
  { label: 'Earnings', href: '/helper', icon: Wallet },
  { label: 'Settings', href: '/helper', icon: Settings },
]

export function HelperDashboard() {
  const helper = getHelperById('aisha-khan')!
  const myBookings = bookings.slice(0, 4)
  const myReviews = reviews.filter((r) => r.helperId === helper.id)
  const pending = myBookings.filter((b) => b.status === 'confirmed')
  const earnings = bookings
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + b.amount, 0)

  return (
    <DashboardShell
      navItems={navItems}
      activeHref="/helper"
      roleLabel="Helper portal"
      userName={helper.name}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div>
          <h2 className="font-heading text-2xl font-bold">
            Hi {helper.name.split(' ')[0]}, welcome back
          </h2>
          <p className="text-muted-foreground">
            Manage your job requests, reviews, and earnings.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Wallet}
            label="Total earnings"
            value={`$${earnings.toLocaleString()}`}
            hint="From completed jobs"
          />
          <StatCard
            icon={CheckCircle2}
            label="Jobs completed"
            value={`${helper.completedJobs}`}
          />
          <StatCard
            icon={Star}
            label="Rating"
            value={helper.rating.toFixed(1)}
            hint={`${helper.reviewCount} reviews`}
          />
          <StatCard
            icon={Clock}
            label="Response time"
            value={helper.responseTime}
          />
        </div>

        {/* Pending requests */}
        <section>
          <h3 className="mb-4 font-heading text-lg font-semibold">
            New job requests
          </h3>
          <div className="flex flex-col gap-3">
            {pending.map((b) => (
              <Card key={b.id}>
                <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">
                      {b.service} for {b.customerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {b.date} at {b.time} · {b.duration} · {b.address}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <XCircle className="size-4" />
                      Decline
                    </Button>
                    <Button size="sm">
                      <CheckCircle2 className="size-4" />
                      Accept
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {pending.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No new requests right now.
              </p>
            )}
          </div>
        </section>

        {/* Booking history */}
        <section>
          <h3 className="mb-4 font-heading text-lg font-semibold">
            Job history
          </h3>
          <BookingsTable
            bookings={myBookings}
            nameLabel="Customer"
            nameKey="customer"
          />
        </section>

        {/* Reviews */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold">
              Recent reviews
            </h3>
            <StarRating rating={helper.rating} showValue />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {myReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  )
}
