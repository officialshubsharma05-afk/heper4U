import type { Metadata } from 'next'
import { Star } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { ReviewCard } from '@/components/helpers/review-card'
import { StarRating } from '@/components/shared/star-rating'
import { reviews } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Reviews | Helper4U',
  description:
    'Read verified reviews from families who found trusted household help through Helper4U.',
}

export default function ReviewsPage() {
  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0

  return (
    <SiteShell>
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Star className="size-7" />
          </div>
          <h1 className="mt-5 text-balance font-heading text-4xl font-bold">
            What families say
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2">
            <StarRating rating={avg} size="md" showValue />
            <span className="text-muted-foreground">
              from {reviews.length} verified reviews
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} showHelper />
          ))}
        </div>
      </div>
    </SiteShell>
  )
}
