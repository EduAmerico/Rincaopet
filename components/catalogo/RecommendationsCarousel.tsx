'use client'

interface RecommendationsCarouselProps {
  children: React.ReactNode
}

export function RecommendationsCarousel({ children }: RecommendationsCarouselProps) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 scrollbar-hide md:mx-0 md:px-0">
      <div className="flex gap-3 pb-2">{children}</div>
    </div>
  )
}
