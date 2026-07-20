import { Badge } from '@/components/ui/badge'
import type { BookingStatus } from '@/types'

const map: Record<
  BookingStatus,
  {
    label: string
    variant: 'default' | 'secondary' | 'success' | 'highlight' | 'destructive' | 'outline'
  }
> = {
  pending: { label: 'Pending', variant: 'highlight' },
  confirmed: { label: 'Confirmed', variant: 'default' },
  'in-progress': { label: 'In progress', variant: 'secondary' },
  completed: { label: 'Completed', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
}

export function StatusBadge({ status }: { status: BookingStatus }) {
  const s = map[status]
  return <Badge variant={s.variant}>{s.label}</Badge>
}
