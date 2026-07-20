import Link from 'next/link'
import { BadgeCheck, Briefcase, MapPin } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { StarRating } from '@/components/shared/star-rating'
import { ServiceIcon } from '@/components/shared/service-icon'
import { formatCurrency } from '@/lib/format'
import type { Helper } from '@/types'

export function HelperCard({ helper }: { helper: Helper }) {
  return (
    <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start gap-4 p-5">
        <Avatar className="size-16 rounded-xl">
          <AvatarImage src={helper.avatar} alt={helper.name} />
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-heading font-semibold">{helper.name}</h3>
            {helper.verification === 'verified' && (
              <BadgeCheck className="size-4 shrink-0 text-primary" />
            )}
          </div>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <ServiceIcon name={helper.service} className="size-3.5" />
            {helper.serviceLabel}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <StarRating rating={helper.rating} showValue />
            <span className="text-xs text-muted-foreground">
              ({helper.reviewCount})
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 px-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="size-3.5" /> {helper.city}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="size-3.5" /> {helper.experienceYears} yrs exp
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5 px-5">
        {helper.skills.slice(0, 3).map((skill) => (
          <Badge key={skill} variant="secondary" className="font-normal">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border p-5">
        <div>
          <span className="font-heading text-lg font-bold">
            {formatCurrency(helper.pricing.hourly)}
          </span>
          <span className="text-sm text-muted-foreground">/hr</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" render={<Link href={`/helpers/${helper.id}`} />}>
            View
          </Button>
          <Button size="sm" render={<Link href={`/book/${helper.id}`} />}>
            Book now
          </Button>
        </div>
      </div>
    </Card>
  )
}
