import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { formatCurrency, formatDate } from '@/lib/format'
import type { Booking } from '@/types'

export function BookingsTable({
  bookings,
  nameLabel = 'Helper',
  nameKey = 'helper',
}: {
  bookings: Booking[]
  nameLabel?: string
  nameKey?: 'helper' | 'customer'
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-4 py-3 font-medium">{nameLabel}</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr
                key={b.id}
                className="border-b border-border last:border-0 hover:bg-muted/50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {nameKey === 'helper' ? (
                      <Avatar className="size-8">
                        <AvatarImage src={b.helperAvatar} alt={b.helperName} />
                      </Avatar>
                    ) : null}
                    <div>
                      <p className="font-medium">
                        {nameKey === 'helper' ? b.helperName : b.customerName}
                      </p>
                      <p className="text-xs text-muted-foreground">{b.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{b.service}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(b.date)}
                  <span className="block text-xs">{b.time}</span>
                </td>
                <td className="px-4 py-3 font-medium">
                  {formatCurrency(b.amount)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={b.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {bookings.length === 0 && (
        <p className="px-4 py-10 text-center text-sm text-muted-foreground">
          No bookings yet.
        </p>
      )}
    </div>
  )
}
