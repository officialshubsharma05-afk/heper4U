'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { CITIES, SERVICES } from '@/lib/data'
import { cn } from '@/lib/utils'

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter()
  const [service, setService] = useState('')
  const [city, setCity] = useState('')
  const [query, setQuery] = useState('')

  function handleSearch() {
    const params = new URLSearchParams()
    if (service) params.set('service', service)
    if (city) params.set('city', city)
    if (query) params.set('q', query)
    router.push(`/browse?${params.toString()}`)
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg sm:flex-row sm:items-center',
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-2 rounded-lg px-3 sm:border-r sm:border-border">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleSearch()
          }}
          placeholder="Search maid, nanny, cook..."
          className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          aria-label="Search helpers"
        />
      </div>

      <Select
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="sm:w-48 sm:border-0 sm:shadow-none"
        aria-label="Service type"
      >
        <option value="">All services</option>
        {SERVICES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </Select>

      <div className="relative sm:w-44">
        <MapPin className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
        <Select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-9 sm:border-0 sm:shadow-none"
          aria-label="City"
        >
          <option value="">All cities</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      <Button size="lg" className="h-11 px-6" onClick={handleSearch}>
        <Search className="size-4" />
        Search
      </Button>
    </div>
  )
}
