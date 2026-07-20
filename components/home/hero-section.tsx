import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck, ShieldCheck, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/home/search-bar'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/60 to-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
        <div>
          <Badge variant="success" className="mb-5">
            <ShieldCheck className="size-3" />
            100% background-verified helpers
          </Badge>
          <h1 className="font-heading text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
            Trusted help for every home, on your schedule
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
            Hire verified maids, nannies, babysitters, and caregivers. Book by
            the hour, month, or year — with confidence and care.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="h-11 px-6" render={<Link href="/browse" />}>
              Find a helper
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-6"
              render={<Link href="/register" />}
            >
              Become a helper
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Star className="size-4 fill-highlight text-highlight" />
              <span className="font-semibold">4.9/5</span>
              <span className="text-muted-foreground">avg. rating</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-primary" />
              <span className="font-semibold">950+</span>
              <span className="text-muted-foreground">verified helpers</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border shadow-xl">
            <Image
              src="/hero-home.png"
              alt="A friendly home helper with a happy family in a bright living room"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-border bg-card p-4 shadow-lg sm:block">
            <p className="text-xs text-muted-foreground">Booked this week</p>
            <p className="font-heading text-2xl font-bold">2,400+</p>
            <p className="text-xs text-muted-foreground">services completed</p>
          </div>
        </div>
      </div>

      <div className="mx-auto -mb-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <SearchBar className="relative z-10" />
      </div>
      <div className="h-8" />
    </section>
  )
}
