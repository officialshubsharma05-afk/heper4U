'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { HelperCard } from '@/components/helpers/helper-card'
import { CITIES, SERVICES } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { Helper } from '@/types'

const experienceOptions = [
  { value: '0', label: 'Any experience' },
  { value: '3', label: '3+ years' },
  { value: '5', label: '5+ years' },
  { value: '10', label: '10+ years' },
]

const priceOptions = [
  { value: '0', label: 'Any price' },
  { value: '25', label: 'Under $25/hr' },
  { value: '30', label: 'Under $30/hr' },
]

const sortOptions = [
  { value: 'rating', label: 'Top rated' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
  { value: 'experience', label: 'Most experienced' },
]

export function BrowseClient({ helpers }: { helpers: Helper[] }) {
  const params = useSearchParams()

  const [query, setQuery] = useState(params.get('q') ?? '')
  const [service, setService] = useState(params.get('service') ?? '')
  const [city, setCity] = useState(params.get('city') ?? '')
  const [experience, setExperience] = useState('0')
  const [price, setPrice] = useState('0')
  const [sort, setSort] = useState('rating')
  const [showFilters, setShowFilters] = useState(false)

  const results = useMemo(() => {
    const list = helpers.filter((h) => {
      if (query && !`${h.name} ${h.serviceLabel} ${h.skills.join(' ')}`.toLowerCase().includes(query.toLowerCase())) {
        return false
      }
      if (service && h.service !== service) return false
      if (city && h.city !== city) return false
      if (experience !== '0' && h.experienceYears < Number(experience)) return false
      if (price !== '0' && h.pricing.hourly > Number(price)) return false
      return true
    })

    return [...list].sort((a, b) => {
      switch (sort) {
        case 'price-low':
          return a.pricing.hourly - b.pricing.hourly
        case 'price-high':
          return b.pricing.hourly - a.pricing.hourly
        case 'experience':
          return b.experienceYears - a.experienceYears
        default:
          return b.rating - a.rating
      }
    })
  }, [query, service, city, experience, price, sort])

  function resetFilters() {
    setQuery('')
    setService('')
    setCity('')
    setExperience('0')
    setPrice('0')
    setSort('rating')
  }

  const hasActiveFilters =
    query || service || city || experience !== '0' || price !== '0'

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">Browse helpers</h1>
        <p className="mt-1 text-muted-foreground">
          Find verified maids, nannies, and caregivers in your area.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside
          className={cn(
            'flex-col gap-6 lg:flex',
            showFilters ? 'flex' : 'hidden',
          )}
        >
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold">Filters</h2>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <X className="size-3" /> Clear
                </button>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="q">Search</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="q"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Name or skill"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="service">Service</Label>
                <Select
                  id="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="">All services</option>
                  {SERVICES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="city">City</Label>
                <Select
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">All cities</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="experience">Experience</Label>
                <Select
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  {experienceOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="price">Pricing</Label>
                <Select
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                >
                  {priceOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {results.length}
              </span>{' '}
              helpers found
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters((v) => !v)}
              >
                <SlidersHorizontal className="size-4" />
                Filters
              </Button>
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 w-44 text-sm"
                aria-label="Sort by"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((helper) => (
                <HelperCard key={helper.id} helper={helper} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
              <p className="font-heading text-lg font-semibold">
                No helpers found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your filters to see more results.
              </p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
