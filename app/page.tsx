import { SiteShell } from '@/components/layout/site-shell'
import { HeroSection } from '@/components/home/hero-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { PopularHelpersSection } from '@/components/home/popular-helpers-section'
import { HowItWorksSection } from '@/components/home/how-it-works-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { FaqSection } from '@/components/home/faq-section'
import { CtaSection } from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <SiteShell>
      <HeroSection />
      <CategoriesSection />
      <PopularHelpersSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </SiteShell>
  )
}
