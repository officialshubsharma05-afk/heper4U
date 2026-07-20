import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Heart, Users, Award, ArrowRight } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/shared/section-heading'

export const metadata: Metadata = {
  title: 'About | Helper4U',
  description:
    'Helper4U connects households with verified maids, nannies, and caregivers you can trust.',
}

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust & safety',
    description:
      'Every helper is background-checked and verified before joining. Your family’s safety is our top priority.',
  },
  {
    icon: Heart,
    title: 'Genuine care',
    description:
      'We match you with people who treat your home and loved ones with warmth and respect.',
  },
  {
    icon: Users,
    title: 'Fair for helpers',
    description:
      'We empower helpers with fair pay, flexible schedules, and the tools to grow their careers.',
  },
  {
    icon: Award,
    title: 'Quality first',
    description:
      'Ratings, reviews, and ongoing support ensure consistently excellent service.',
  },
]

const stats = [
  { value: '1,000+', label: 'Verified helpers' },
  { value: '25k+', label: 'Happy households' },
  { value: '4.9', label: 'Average rating' },
  { value: '8', label: 'Cities served' },
]

export default function AboutPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
          <div>
            <p className="font-medium text-primary">Our mission</p>
            <h1 className="mt-3 text-balance font-heading text-4xl font-bold leading-tight lg:text-5xl">
              Making trusted household help accessible to everyone.
            </h1>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Helper4U was born from a simple belief: finding reliable help for
              your home shouldn&apos;t be stressful. We connect families with
              verified maids, nannies, babysitters, cooks, and caregivers — all
              in one trusted place.
            </p>
            <Button size="lg" className="mt-6" render={<Link href="/browse" />}>
              Find a helper
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/hero-home.png"
              alt="A home helper assisting a happy family"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-primary lg:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
          <SectionHeading
            eyebrow="What we stand for"
            title="Our values"
            description="The principles that guide every match we make."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title}>
                <CardContent className="pt-6">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="mt-4 font-heading font-semibold">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {v.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance font-heading text-3xl font-bold">
          Ready to find the perfect helper?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Join thousands of families who trust Helper4U for their homes.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" render={<Link href="/register" />}>
            Get started
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/contact" />}>
            Contact us
          </Button>
        </div>
      </section>
    </SiteShell>
  )
}
