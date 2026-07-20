import type { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: 'Contact | Helper4U',
  description: 'Get in touch with the Helper4U team. We’re here to help.',
}

const details = [
  { icon: Mail, label: 'Email', value: 'support@helper4u.com' },
  { icon: Phone, label: 'Phone', value: '(555) 240-8811' },
  { icon: MapPin, label: 'Office', value: '450 Market St, San Francisco, CA' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat, 8am – 8pm' },
]

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl font-bold">Get in touch</h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Have a question about booking, becoming a helper, or anything else?
            Our team is happy to help.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <ContactForm />

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-secondary/40 p-6">
              <h2 className="font-heading font-semibold">Contact details</h2>
              <ul className="mt-4 flex flex-col gap-4">
                {details.map((d) => (
                  <li key={d.label} className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <d.icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm text-muted-foreground">{d.label}</p>
                      <p className="font-medium">{d.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border p-6">
              <h2 className="font-heading font-semibold">Need urgent help?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                For active bookings that need immediate attention, call our
                priority line and we&apos;ll assist right away.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  )
}
