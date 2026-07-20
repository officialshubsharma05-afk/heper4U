import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HelperCard } from '@/components/helpers/helper-card'
import { SectionHeading } from '@/components/shared/section-heading'
import { helpers } from '@/lib/data'

export function PopularHelpersSection() {
  const popular = helpers.slice(0, 3)
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Top rated"
            title="Popular helpers near you"
            description="Highly rated professionals loved by families across the country."
            className="sm:max-w-xl"
          />
          <Button variant="outline" render={<Link href="/browse" />}>
            View all
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((helper) => (
            <HelperCard key={helper.id} helper={helper} />
          ))}
        </div>
      </div>
    </section>
  )
}
