import {
  Baby,
  ChefHat,
  HandHeart,
  HeartHandshake,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import type { ServiceType } from '@/types'

const iconMap: Record<string, LucideIcon> = {
  maid: Sparkles,
  sparkles: Sparkles,
  nanny: Baby,
  baby: Baby,
  babysitter: HeartHandshake,
  'heart-handshake': HeartHandshake,
  cook: ChefHat,
  'chef-hat': ChefHat,
  'elder-care': HandHeart,
  'hand-heart': HandHeart,
}

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceType | string
  className?: string
}) {
  const Icon = iconMap[name] ?? Sparkles
  return <Icon className={className} />
}
