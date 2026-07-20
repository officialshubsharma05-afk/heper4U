import { Accordion } from '@/components/ui/accordion'
import { SectionHeading } from '@/components/shared/section-heading'
import { faqs } from '@/lib/data'

export function FaqSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything you need to know about booking trusted help on Helper4U."
      />
      <Accordion items={faqs} className="mt-10" />
    </section>
  )
}
