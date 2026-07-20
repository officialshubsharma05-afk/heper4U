import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
        <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold text-balance sm:text-4xl">
          Ready to find the perfect helper for your home?
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-primary-foreground/85 text-pretty">
          Join thousands of households who trust Helper4U for verified, reliable
          home help. Get started in minutes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            variant="secondary"
            className="h-11 px-6"
            render={<Link href="/browse" />}
          >
            Browse helpers
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 border-primary-foreground/30 bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            render={<Link href="/register" />}
          >
            Create free account
          </Button>
        </div>
      </div>
    </section>
  )
}
