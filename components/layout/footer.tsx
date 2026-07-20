import Link from 'next/link'
import { Mail, MapPin, Phone, Send, Globe, MessageCircle } from 'lucide-react'
import { Logo } from '@/components/shared/logo'

const socials = [
  { icon: Globe, label: 'Website' },
  { icon: Send, label: 'Newsletter' },
  { icon: MessageCircle, label: 'Community' },
]

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Maids & Housekeeping', href: '/browse?service=maid' },
      { label: 'Nannies', href: '/browse?service=nanny' },
      { label: 'Babysitters', href: '/browse?service=babysitter' },
      { label: 'Home Cooks', href: '/browse?service=cook' },
      { label: 'Elder Care', href: '/browse?service=elder-care' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'For Helpers',
    links: [
      { label: 'Become a Helper', href: '/register' },
      { label: 'Helper Dashboard', href: '/helper' },
      { label: 'Bookings', href: '/bookings' },
      { label: 'Log in', href: '/login' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Helper4U connects households with verified maids, nannies, and
              caregivers. Trusted help for every home, on your schedule.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={label}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Helper4U. All rights reserved.</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <span className="flex items-center gap-2">
              <Mail className="size-4" /> support@helper4u.com
            </span>
            <span className="flex items-center gap-2">
              <Phone className="size-4" /> +1 (555) 012-3456
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4" /> New York, NY
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
