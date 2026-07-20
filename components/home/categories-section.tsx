import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { ServiceIcon } from '@/components/shared/service-icon'
import { categories } from '@/lib/data'
import { SectionHeading } from '@/components/shared/section-heading'

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
      <SectionHeading
        eyebrow="Services"
        title="Browse by category"
        description="From spotless homes to attentive childcare, find the right professional for your needs."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/browse?service=${cat.id}`}>
            <Card className="group h-full p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ServiceIcon name={cat.id} className="size-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">
                {cat.label}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {cat.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {cat.helperCount}+ helpers
                </span>
                <span className="flex items-center gap-1 font-medium text-primary">
                  Explore
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
