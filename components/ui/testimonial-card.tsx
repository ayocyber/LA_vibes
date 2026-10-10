import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  /** Line under the name: a social handle, or role and organisation. */
  handle: string
  /** Photo URL. Without one, the author's initials are shown. */
  avatar?: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  /** Paragraphs are separated by a blank line. */
  text: string
  href?: string
  className?: string
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("")

export function TestimonialCard({
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'

  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noopener" } : {})}
      className={cn(
        "flex flex-col rounded-2xl border border-border",
        "bg-gradient-to-b from-muted/80 to-muted/20",
        "p-6 text-start sm:p-8",
        "hover:border-primary/40 hover:from-muted",
        "w-[300px] shrink-0 sm:w-[420px]",
        "transition-colors duration-300",
        className
      )}
    >
      <span aria-hidden className="font-display text-5xl leading-[0.6] text-primary">&ldquo;</span>
      <div className="mt-4 flex-1 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
        {text.split(/\n\s*\n/).map((para, i) => (
          <p key={i}>{para.trim()}</p>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <Avatar className="h-11 w-11">
          {author.avatar && <AvatarImage src={author.avatar} alt={author.name} />}
          <AvatarFallback className="bg-primary/15 text-sm font-semibold text-primary">
            {initials(author.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start gap-1">
          <span className="text-[15px] font-semibold leading-none text-foreground">
            {author.name}
          </span>
          <span className="text-[13px] text-muted-foreground">
            {author.handle}
          </span>
        </div>
      </div>
    </Card>
  )
}
