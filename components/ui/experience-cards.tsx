"use client";

import type { PointerEvent } from "react";
import { motion, MotionConfig } from "motion/react";
import { ArrowUpRight, Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ExperienceCard = {
  icon: LucideIcon;
  title: string;
  blurb: string;
  features: string[];
  /** Small pill in the corner, e.g. "Most booked". */
  badge?: string;
  /** Gives the card an accent border at rest. */
  featured?: boolean;
  /** Call to action at the bottom of the card. */
  cta?: { label: string; href: string; onClick?: () => void };
};

// Moves the spotlight with the cursor via CSS variables, so no re-render.
function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

// Grid of service cards: icon, badge, title, blurb, checklist and a CTA, with
// a cursor spotlight, lift on hover and a big index number as a watermark.
export default function ExperienceCards({
  cards,
  className,
}: {
  cards: ExperienceCard[];
  className?: string;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              onPointerMove={trackSpotlight}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border bg-card p-7 md:p-8",
                "transition-[translate,border-color,box-shadow] duration-500 hover:-translate-y-1.5",
                "hover:border-primary/60 hover:shadow-[0_24px_60px_-30px_var(--accent)]",
                card.featured ? "border-primary/40" : "border-border",
              )}
            >
              {/* cursor spotlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--accent) 14%, transparent), transparent 45%)",
                }}
              />
              {/* index watermark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-8 right-3 select-none font-display text-[128px] font-bold leading-none text-foreground/[0.04] transition-colors duration-500 group-hover:text-primary/[0.08]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative flex items-start justify-between gap-4">
                <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/25 transition-colors duration-500 group-hover:bg-primary group-hover:text-background">
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>
                {card.badge && (
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                    {card.badge}
                  </span>
                )}
              </div>

              <h3 className="relative text-2xl font-semibold" style={{ marginTop: 28, lineHeight: 1.1 }}>
                {card.title}
              </h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {card.blurb}
              </p>

              <div className="relative mt-6 h-px bg-border" />

              <ul className="relative mt-5 space-y-2.5">
                {card.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-foreground/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.2} />
                    {f}
                  </li>
                ))}
              </ul>

              {card.cta && (
                <a
                  href={card.cta.href}
                  onClick={card.cta.onClick}
                  className="relative mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-foreground transition-colors group-hover:text-primary"
                >
                  {card.cta.label}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </motion.article>
          );
        })}
      </div>
    </MotionConfig>
  );
}
