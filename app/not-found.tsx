import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SiteShell } from '@/components/layout/site-shell'

export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <p className="font-heading text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Button className="mt-6" render={<Link href="/" />}>
          Back to home
        </Button>
      </div>
    </SiteShell>
  )
}
