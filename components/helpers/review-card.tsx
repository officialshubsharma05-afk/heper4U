import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { StarRating } from '@/components/shared/star-rating'
import { getInitials } from '@/lib/utils'
import type { Review } from '@/types'

export function ReviewCard({
  review,
  showHelper = false,
}: {
  review: Review
  showHelper?: boolean
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{getInitials(review.author)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{review.author}</p>
            <p className="text-xs text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {review.comment}
      </p>
      {showHelper && (
        <p className="mt-3 text-xs text-muted-foreground">
          Reviewed{' '}
          <span className="font-medium text-foreground">
            {review.helperName}
          </span>
        </p>
      )}
    </Card>
  )
}
