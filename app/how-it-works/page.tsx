import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteShell } from '@/components/layout/site-shell'
import { HowItWorksSection } from '@/components/home/how-it-works-section'
import { FaqSection } from '@/components/home/faq-section'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'How it works | Helper4U',
  description:
    'Learn how Helper4U helps you find, book, and manage trusted household help in a few simple steps.',
}

export default function HowItWorksPage() {
  return (
    <SiteShell>
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <h1 className="text-balance font-heading text-4xl font-bold">
            How Helper4U works
          </h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Finding trusted help for your home takes just a few simple steps.
          </p>
        </div>
      </div>
      <HowItWorksSection />
      <FaqSection />
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <Button size="lg" render={<Link href="/browse" />}>
          Browse helpers
        </Button>
      </section>
    </SiteShell>
  )
}
