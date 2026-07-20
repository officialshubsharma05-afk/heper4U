import { CalendarCheck, Search, ThumbsUp, UserCheck } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'

const steps = [
  {
    icon: Search,
    title: 'Search & compare',
    description:
      'Filter verified helpers by service, city, experience, and price to find your perfect match.',
  },
  {
    icon: UserCheck,
    title: 'Review profiles',
    description:
      'Read verified reviews, check skills and availability, then shortlist your favorites.',
  },
  {
    icon: CalendarCheck,
    title: 'Book securely',
    description:
      'Pick an hourly, monthly, or yearly plan and confirm your booking with secure payment.',
  },
  {
    icon: ThumbsUp,
    title: 'Relax & rate',
    description:
      'Enjoy dependable help at home, then leave a review to help other families.',
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8"
    >
      <SectionHeading
        eyebrow="How it works"
        title="Hire help in four simple steps"
        description="A safe, transparent process from search to service — designed around your peace of mind."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div key={step.title} className="relative flex flex-col items-start">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <step.icon className="size-7" />
            </div>
            <span className="mt-4 text-sm font-semibold text-primary">
              Step {i + 1}
            </span>
            <h3 className="mt-1 font-heading text-lg font-semibold">
              {step.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
