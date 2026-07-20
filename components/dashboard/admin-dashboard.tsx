'use client'

import {
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarDays,
  DollarSign,
  ShieldCheck,
  BadgeCheck,
  Clock,
  MoreHorizontal,
} from 'lucide-react'
import { DashboardShell, StatCard } from '@/components/dashboard/dashboard-shell'
import { BookingsTable } from '@/components/dashboard/bookings-table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { StarRating } from '@/components/shared/star-rating'
import type { Booking, Helper, PlatformUser } from '@/types'
import { getInitials } from '@/lib/utils'

const navItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Helpers', href: '/admin', icon: UserCheck },
  { label: 'Customers', href: '/admin', icon: Users },
  { label: 'Bookings', href: '/admin', icon: CalendarDays },
  { label: 'Verifications', href: '/admin', icon: ShieldCheck },
]

const revenue = [
  { month: 'Feb', value: 42 },
  { month: 'Mar', value: 58 },
  { month: 'Apr', value: 51 },
  { month: 'May', value: 74 },
  { month: 'Jun', value: 89 },
  { month: 'Jul', value: 96 },
]

interface AdminDashboardProps {
  bookings: Booking[]
  helpers: Helper[]
  platformUsers: PlatformUser[]
}

export function AdminDashboard({ bookings, helpers, platformUsers }: AdminDashboardProps) {
  const maxRev = Math.max(...revenue.map((r) => r.value))
  const revenueTotal = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((s, b) => s + b.amount, 0)
  const pendingVerifications = helpers.filter(
    (h) => h.verification === 'pending',
  )

  return (
    <DashboardShell
      navItems={navItems}
      activeHref="/admin"
      roleLabel="Admin console"
      userName="Admin User"
    >
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="font-heading text-2xl font-bold">Platform overview</h2>
          <p className="text-muted-foreground">
            Monitor helpers, bookings, and verifications across Helper4U.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={UserCheck}
            label="Active helpers"
            value={`${helpers.length}`}
            hint="Across all services"
          />
          <StatCard
            icon={Users}
            label="Customers"
            value={`${platformUsers.length}`}
          />
          <StatCard
            icon={CalendarDays}
            label="Total bookings"
            value={`${bookings.length}`}
          />
          <StatCard
            icon={DollarSign}
            label="Revenue"
            value={`$${revenueTotal.toLocaleString()}`}
            hint="This period"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Revenue chart */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-semibold">Revenue trend</h3>
                  <p className="text-sm text-muted-foreground">
                    Monthly bookings revenue (in $k)
                  </p>
                </div>
              </div>
              <div className="mt-6 flex h-48 items-end justify-between gap-3">
                {revenue.map((r) => (
                  <div
                    key={r.month}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="w-full rounded-t-md bg-primary transition-all"
                        style={{ height: `${(r.value / maxRev) * 100}%` }}
                        title={`$${r.value}k`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {r.month}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending verifications */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-heading font-semibold">
                Pending verifications
              </h3>
              <p className="text-sm text-muted-foreground">
                Helpers awaiting approval
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {pendingVerifications.map((h) => (
                  <li
                    key={h.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarImage src={h.avatar} alt={h.name} />
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{h.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {h.serviceLabel}
                        </p>
                      </div>
                    </div>
                    <Button size="xs">
                      <BadgeCheck className="size-3.5" />
                      Verify
                    </Button>
                  </li>
                ))}
                {pendingVerifications.length === 0 && (
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4" />
                    All caught up.
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Helpers table */}
        <section>
          <h3 className="mb-4 font-heading text-lg font-semibold">Helpers</h3>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Helper</th>
                    <th className="px-4 py-3 font-medium">Service</th>
                    <th className="px-4 py-3 font-medium">City</th>
                    <th className="px-4 py-3 font-medium">Rating</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {helpers.map((h) => (
                    <tr
                      key={h.id}
                      className="border-b border-border last:border-0 hover:bg-muted/50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarImage src={h.avatar} alt={h.name} />
                          </Avatar>
                          <span className="font-medium">{h.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {h.serviceLabel}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {h.city}
                      </td>
                      <td className="px-4 py-3">
                        <StarRating rating={h.rating} showValue />
                      </td>
                      <td className="px-4 py-3">
                        {h.verification === 'verified' ? (
                          <Badge variant="success">Verified</Badge>
                        ) : (
                          <Badge variant="highlight">Pending</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Recent bookings */}
        <section>
          <h3 className="mb-4 font-heading text-lg font-semibold">
            Recent bookings
          </h3>
          <BookingsTable bookings={bookings} />
        </section>
      </div>
    </DashboardShell>
  )
}
