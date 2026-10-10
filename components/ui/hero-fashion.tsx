"use client";

import type { PointerEvent, ReactNode } from "react";
import {
  motion,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

export type HeroFashionItem = { label: string; href?: string };

export type HeroFashionProps = {
  /** Big wordmark at the top of the text column. */
  title: ReactNode;
  /** Heading level for the title; use "h2" when the page already has an h1. */
  titleAs?: "h1" | "h2";
  image: string;
  imageAlt: string;
  /** Short list that lifts on hover. */
  items?: HeroFashionItem[];
  /** Small heading above the body copy. */
  kicker?: ReactNode;
  /** Body copy under the kicker. */
  children?: ReactNode;
  className?: string;
};

const MAX_TILT = 12; // degrees at the card's edge

// Photo that bends toward the cursor and springs back flat on leave. Mouse/pen only; stays flat for reduced motion.
function TiltImage({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion();
  // Pointer position across the card, 0..1 on each axis.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), spring);
  const scale = useSpring(1, spring);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    scale.set(1.03);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    scale.set(1);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="relative rounded-2xl shadow-2xl overflow-hidden will-change-transform"
      >
        <img
          src={src}
          alt={alt}
          className="block w-full aspect-[4/5] object-cover brightness-105"
        />
      </motion.div>
    </div>
  );
}

// Split hero: image on the right (first on mobile), wordmark, hover list and
// copy on the left. Colours come from the shadcn tokens so it follows the theme.
export default function HeroFashion({
  title,
  titleAs: Title = "h1",
  image,
  imageAlt,
  items = [],
  kicker,
  children,
  className = "",
}: HeroFashionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <div className={`grid gap-10 md:grid-cols-2 md:gap-16 relative ${className}`}>
        <div className="relative md:order-2">
          <div className="absolute -z-10 w-72 h-72 rounded-full bg-primary blur-3xl opacity-20 -top-10 -left-10" />
          <TiltImage src={image} alt={imageAlt} />
        </div>

        <div className="md:order-1 flex flex-col justify-between gap-10">
          <Title className="text-6xl md:text-7xl font-bold text-foreground leading-tight tracking-tighter">
            {title}
          </Title>

          {items.length > 0 && (
            <ul className="space-y-2 tracking-tighter text-lg text-foreground/90">
              {items.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 0.8, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    opacity: 1,
                    y: -3,
                    transition: { duration: 0.4, ease: "easeOut" },
                  }}
                >
                  {item.href ? (
                    <a href={item.href} className="cursor-pointer">
                      {item.label}
                    </a>
                  ) : (
                    item.label
                )}
              </motion.li>
            ))}
          </ul>
          )}

          {(kicker || children) && (
            <div>
              {kicker && (
                <p className="text-2xl font-medium text-foreground">{kicker}</p>
              )}
              <div className="text-lg text-foreground/80 pt-4 tracking-tight">
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}
