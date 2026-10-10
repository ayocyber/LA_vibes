import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  id?: string
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

// Endless strip of testimonial cards. Two identical tracks scroll side by side
// so the loop is seamless; hover pauses it. With reduced motion it stops and
// becomes a swipeable row instead.
export function TestimonialsSection({
  id,
  eyebrow,
  title,
  description,
  testimonials,
  className
}: TestimonialsSectionProps) {
  // Repeat short lists so one track is always wider than the screen.
  const sets = Math.max(2, Math.ceil(8 / Math.max(testimonials.length, 1)))
  const track = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 flex-row items-stretch [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
    >
      {Array.from({ length: sets }, (_, setIndex) =>
        testimonials.map((testimonial, i) => (
          <TestimonialCard key={`${setIndex}-${i}`} {...testimonial} />
        ))
      )}
    </div>
  )

  return (
    <section
      id={id}
      className={cn(
        "bg-background text-foreground",
        "py-16 sm:py-24 md:py-32 px-0",
        className
      )}
    >
      <div className="mx-auto flex w-full flex-col items-center gap-10 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-6">
          {eyebrow}
          <h2 className="max-w-[720px] text-3xl font-semibold sm:text-5xl" style={{ lineHeight: 1.1 }}>
            {title}
          </h2>
          {description && (
            <p className="max-w-[600px] text-base font-medium text-muted-foreground sm:text-xl">
              {description}
            </p>
          )}
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex w-full flex-row overflow-hidden p-2 [--gap:1.25rem] [gap:var(--gap)] [--duration:60s] motion-reduce:overflow-x-auto">
            {track(false)}
            <div className="contents motion-reduce:hidden">{track(true)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
