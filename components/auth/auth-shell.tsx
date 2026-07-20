import type { ReactNode } from 'react'
import Image from 'next/image'
import { ShieldCheck, Star, Users } from 'lucide-react'
import { Logo } from '@/components/shared/logo'

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand side */}
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <Image
          src="/hero-home.png"
          alt="A friendly home helper with a happy family"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Logo className="text-primary-foreground" />
          <div>
            <h2 className="text-balance font-heading text-3xl font-bold leading-tight">
              Trusted help for every home.
            </h2>
            <p className="mt-3 max-w-sm text-primary-foreground/80">
              Verified maids, nannies, and caregivers — ready when you need
              them.
            </p>
            <ul className="mt-8 flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-5" /> Background-checked
                professionals
              </li>
              <li className="flex items-center gap-2">
                <Users className="size-5" /> 1,000+ helpers nationwide
              </li>
              <li className="flex items-center gap-2">
                <Star className="size-5" /> 4.9 average rating
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  )
}
