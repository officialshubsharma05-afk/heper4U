'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  BadgeCheck,
  CalendarCheck,
  Check,
  ChevronLeft,
  Loader2,
  MapPin,
} from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { createBooking } from '@/app/actions/bookings'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { StarRating } from '@/components/shared/star-rating'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Helper, PlanType } from '@/types'

const steps = ['Plan', 'Schedule', 'Details', 'Confirm'] as const

const durationOptions = [
  '2 hours',
  '4 hours',
  '6 hours',
  '8 hours (full day)',
]

export function BookingClient({ helper }: { helper: Helper }) {
  const params = useSearchParams()
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const initialPlan = (params.get('plan') as PlanType) || 'hourly'

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(0)
  const [plan, setPlan] = useState<PlanType>(initialPlan)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('09:00')
  const [duration, setDuration] = useState(durationOptions[0])
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const price = useMemo(() => {
    if (plan === 'hourly') return helper.pricing.hourly
    if (plan === 'monthly') return helper.pricing.monthly
    return helper.pricing.yearly
  }, [plan, helper])

  const planMeta: Record<PlanType, { label: string; unit: string }> = {
    hourly: { label: 'Hourly', unit: '/hour' },
    monthly: { label: 'Monthly', unit: '/month' },
    yearly: { label: 'Yearly', unit: '/year' },
  }

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0))
  }

  async function handleConfirm() {
    if (!session?.user) {
      router.push(`/login?next=/book/${helper.id}`)
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      await createBooking({
        helperId: helper.id,
        helperName: helper.name,
        helperAvatar: helper.avatar,
        service: helper.serviceLabel,
        plan: planMeta[plan].label,
        amount: price,
        date,
        time,
        duration: plan === 'hourly' ? duration : undefined,
        address,
        notes,
        customerName: name,
        phone,
      })
      setConfirmed(true)
    } catch {
      setError('Could not create your booking. Please try again.')
      setSubmitting(false)
    }
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
          <Check className="size-8 text-primary" />
        </div>
        <h1 className="mt-6 font-heading text-2xl font-bold">
          Booking requested!
        </h1>
        <p className="mt-2 text-muted-foreground">
          We&apos;ve sent your request to {helper.name.split(' ')[0]}. You&apos;ll get a
          confirmation once they accept. Track it anytime from your dashboard.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button render={<Link href="/dashboard" />}>Go to dashboard</Button>
          <Button variant="outline" render={<Link href="/browse" />}>
            Browse more helpers
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <Link
        href={`/helpers/${helper.id}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Back to profile
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          {/* Stepper */}
          <ol className="mb-8 flex items-center gap-2">
            {steps.map((label, i) => (
              <li key={label} className="flex flex-1 items-center gap-2">
                <div
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                    i <= step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {i < step ? <Check className="size-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    'hidden text-sm font-medium sm:inline',
                    i <= step ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {label}
                </span>
                {i < steps.length - 1 && (
                  <span
                    className={cn(
                      'h-px flex-1',
                      i < step ? 'bg-primary' : 'bg-border',
                    )}
                  />
                )}
              </li>
            ))}
          </ol>

          <Card>
            <CardContent className="pt-6">
              {step === 0 && (
                <div>
                  <h2 className="font-heading text-lg font-semibold">
                    Choose a plan
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Select how you&apos;d like to book {helper.name.split(' ')[0]}.
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    {(['hourly', 'monthly', 'yearly'] as PlanType[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPlan(p)}
                        className={cn(
                          'flex items-center justify-between rounded-xl border p-4 text-left transition-colors',
                          plan === p
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:bg-muted',
                        )}
                      >
                        <div>
                          <p className="font-medium">{planMeta[p].label}</p>
                          <p className="text-sm text-muted-foreground">
                            {p === 'hourly'
                              ? 'Occasional or one-off help'
                              : p === 'monthly'
                                ? 'Ongoing support, priority scheduling'
                                : 'Best value, locked-in rate'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-heading text-lg font-bold">
                            {formatCurrency(helper.pricing[p])}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {planMeta[p].unit}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="font-heading text-lg font-semibold">
                    Pick a date &amp; time
                  </h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="date">Start date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="time">Start time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                    {plan === 'hourly' && (
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Select
                          id="duration"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        >
                          {durationOptions.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </Select>
                      </div>
                    )}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Availability: {helper.availability}
                  </p>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-heading text-lg font-semibold">
                    Your details
                  </h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name">Full name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <Label htmlFor="address">Service address</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="123 Main St, Apt 4B"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <Label htmlFor="notes">Notes for the helper</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Anything they should know before arriving?"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="font-heading text-lg font-semibold">
                    Confirm your booking
                  </h2>
                  <dl className="mt-5 flex flex-col gap-3 text-sm">
                    <Row label="Plan" value={planMeta[plan].label} />
                    <Row
                      label="Date & time"
                      value={date ? `${date} at ${time}` : 'Not set'}
                    />
                    {plan === 'hourly' && <Row label="Duration" value={duration} />}
                    <Row label="Name" value={name || 'Not provided'} />
                    <Row label="Phone" value={phone || 'Not provided'} />
                    <Row label="Address" value={address || 'Not provided'} />
                    {notes && <Row label="Notes" value={notes} />}
                  </dl>
                </div>
              )}

              {error && (
                <p
                  className="mt-6 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <Separator className="my-6" />
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={back}
                  disabled={step === 0 || submitting}
                >
                  Back
                </Button>
                {step < steps.length - 1 ? (
                  <Button onClick={next}>Continue</Button>
                ) : (
                  <Button onClick={handleConfirm} disabled={submitting}>
                    {submitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <CalendarCheck className="size-4" />
                    )}
                    Confirm booking
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardContent className="flex flex-col gap-4 pt-6">
              <div className="flex items-center gap-3">
                <Avatar className="size-14 rounded-xl">
                  <AvatarImage src={helper.avatar} alt={helper.name} />
                </Avatar>
                <div>
                  <p className="flex items-center gap-1 font-heading font-semibold">
                    {helper.name}
                    {helper.verification === 'verified' && (
                      <BadgeCheck className="size-4 text-primary" />
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {helper.serviceLabel}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <StarRating rating={helper.rating} showValue />
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" /> {helper.city}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {planMeta[plan].label} rate
                </span>
                <span className="font-heading text-xl font-bold">
                  {formatCurrency(price)}
                  <span className="text-sm font-normal text-muted-foreground">
                    {planMeta[plan].unit}
                  </span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                No charge until {helper.name.split(' ')[0]} confirms your request.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  )
}
