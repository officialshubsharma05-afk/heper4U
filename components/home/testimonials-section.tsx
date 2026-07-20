import { Quote } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { StarRating } from '@/components/shared/star-rating'
import { SectionHeading } from '@/components/shared/section-heading'
import { testimonials } from '@/lib/data'
import { getInitials } from '@/lib/utils'

export function TestimonialsSection() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by families everywhere"
          description="Real stories from households who found trusted help through Helper4U."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.id} className="p-6">
              <Quote className="size-8 text-primary/30" />
              <p className="mt-4 leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{getInitials(t.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <StarRating rating={t.rating} className="mt-4" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
