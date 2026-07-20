import Link from 'next/link'
import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Helper } from '@/types'

export function PricingPlans({ helper }: { helper: Helper }) {
  const plans = [
    {
      id: 'hourly',
      name: 'Hourly',
      price: helper.pricing.hourly,
      unit: '/hour',
      description: 'Perfect for one-off or occasional help.',
      features: ['Book any time', 'Minimum 2 hours', 'Cancel anytime'],
      popular: false,
    },
    {
      id: 'monthly',
      name: 'Monthly',
      price: helper.pricing.monthly,
      unit: '/month',
      description: 'Ongoing support with priority scheduling.',
      features: ['Dedicated helper', 'Priority booking', '~15% savings'],
      popular: true,
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: helper.pricing.yearly,
      unit: '/year',
      description: 'Best value for long-term household help.',
      features: ['Locked-in rate', 'Free replacements', '~25% savings'],
      popular: false,
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={cn(
            'relative p-5',
            plan.popular && 'border-primary ring-1 ring-primary',
          )}
        >
          {plan.popular && (
            <Badge className="absolute -top-2.5 right-4">Most popular</Badge>
          )}
          <h3 className="font-heading font-semibold">{plan.name}</h3>
          <div className="mt-2">
            <span className="font-heading text-2xl font-bold">
              {formatCurrency(plan.price)}
            </span>
            <span className="text-sm text-muted-foreground">{plan.unit}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {plan.description}
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-primary" />
                {f}
              </li>
            ))}
          </ul>
          <Button
            className="mt-5 w-full"
            variant={plan.popular ? 'default' : 'outline'}
            render={<Link href={`/book/${helper.id}?plan=${plan.id}`} />}
          >
            Choose {plan.name.toLowerCase()}
          </Button>
        </Card>
      ))}
    </div>
  )
}
