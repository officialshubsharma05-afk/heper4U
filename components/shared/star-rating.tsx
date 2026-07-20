import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({
  rating,
  size = 'sm',
  showValue = false,
  className,
}: {
  rating: number
  size?: 'sm' | 'md'
  showValue?: boolean
  className?: string
}) {
  const dimension = size === 'sm' ? 'size-3.5' : 'size-5'
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.round(rating)
          return (
            <Star
              key={i}
              className={cn(
                dimension,
                filled
                  ? 'fill-highlight text-highlight'
                  : 'fill-muted text-muted-foreground/40',
              )}
            />
          )
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
