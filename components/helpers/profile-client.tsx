import Link from 'next/link'
import {
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  Clock,
  Languages,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { StarRating } from '@/components/shared/star-rating'
import { ServiceIcon } from '@/components/shared/service-icon'
import { ReviewCard } from '@/components/helpers/review-card'
import { PricingPlans } from '@/components/helpers/pricing-plans'
import { formatCurrency } from '@/lib/format'
import type { Helper, Review } from '@/types'

export function ProfileClient({
  helper,
  reviews,
}: {
  helper: Helper
  reviews: Review[]
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link href="/browse" className="hover:text-foreground">
          Browse helpers
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{helper.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <Card>
            <CardContent className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-start">
              <Avatar className="size-24 rounded-2xl border border-border">
                <AvatarImage src={helper.avatar} alt={helper.name} />
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-heading text-2xl font-bold">
                    {helper.name}
                  </h1>
                  {helper.verification === 'verified' && (
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      <BadgeCheck className="size-5" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {helper.city}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <StarRating rating={helper.rating} showValue />
                  <span className="text-sm text-muted-foreground">
                    {helper.reviewCount} reviews
                  </span>
                  <Badge variant="secondary" className="gap-1">
                    <ServiceIcon name={helper.service} className="size-3.5" />
                    {helper.serviceLabel}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatBox
              icon={<Briefcase className="size-5" />}
              label="Experience"
              value={`${helper.experienceYears} yrs`}
            />
            <StatBox
              icon={<CalendarCheck className="size-5" />}
              label="Jobs done"
              value={`${helper.completedJobs}`}
            />
            <StatBox
              icon={<Clock className="size-5" />}
              label="Responds"
              value={helper.responseTime}
            />
            <StatBox
              icon={<ShieldCheck className="size-5" />}
              label="Background"
              value="Checked"
            />
          </div>

          {/* About */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="font-heading text-lg font-semibold">
                About {helper.name.split(' ')[0]}
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {helper.bio}
              </p>
            </CardContent>
          </Card>

          {/* Languages & skills */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="flex items-center gap-2 font-heading font-semibold">
                  <Languages className="size-4 text-primary" />
                  Languages
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {helper.languages.map((l) => (
                    <Badge key={l} variant="outline">
                      {l}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-heading font-semibold">
                  Skills &amp; specialties
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {helper.skills.map((s) => (
                    <Badge key={s} variant="outline">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="mb-4 font-heading text-xl font-bold">
              Service plans
            </h2>
            <PricingPlans helper={helper} />
          </div>

          {/* Reviews */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold">
                Reviews ({helper.reviewCount})
              </h2>
              <StarRating rating={helper.rating} showValue />
            </div>
            <div className="flex flex-col gap-4">
              {reviews.length > 0 ? (
                reviews.map((r) => <ReviewCard key={r.id} review={r} />)
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sticky booking sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="border-primary/30">
            <CardContent className="flex flex-col gap-4 pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="font-heading text-3xl font-bold">
                  {formatCurrency(helper.pricing.hourly)}
                  <span className="text-base font-normal text-muted-foreground">
                    /hour
                  </span>
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Monthly plan</span>
                <span className="font-semibold">
                  {formatCurrency(helper.pricing.monthly)}
                </span>
              </div>
              <Button
                size="lg"
                className="w-full"
                render={<Link href={`/book/${helper.id}`} />}
              >
                <CalendarCheck className="size-4" />
                Book {helper.name.split(' ')[0]}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                render={<Link href="/contact" />}
              >
                <MessageCircle className="size-4" />
                Message
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                You won&apos;t be charged until the helper confirms.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function StatBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-1 py-4 text-center">
        <span className="text-primary">{icon}</span>
        <span className="font-heading text-lg font-bold">{value}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </CardContent>
    </Card>
  )
}
