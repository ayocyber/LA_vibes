"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ── the corridor ────────────────────────────────────────────────
 * Two rails of cards ride from far behind the screen toward the
 * viewer. Perspective alone does the work that looks like two
 * animations: as a card's z grows it gets bigger *and* its screen x
 * sweeps outward from the vanishing point, because the projection
 * scales position and size by the same factor.
 *
 * Three things shape it, and each one fixes a specific artefact:
 *
 * 1. Depth is authored as *apparent size*, geometrically — each card
 *    is a constant ratio bigger than the one behind it, all the way
 *    out. Spacing a straight z-range evenly instead makes the near
 *    cards tear apart from each other as the projection blows up.
 * 2. The rails open hard in the first stretch and then hold
 *    (`fan` > 1). That opening cancels the — still slow — growth back
 *    there, so the ribbon leaves the centre as a flat band, bends
 *    once, and only then runs out on the diagonal. Parallel rails
 *    project to a straight cone with no bend at all.
 * 3. Neither end of the loop is ever on screen. A card dies with its
 *    inner edge past 50cqw, clear of the container's edge. And it is
 *    born *across* the axis — `railBirth` is negative, so the newest
 *    card starts on the far side and sweeps back through the centre.
 *    That plugs the throat: the axis stays covered at every instant,
 *    and a newborn lands behind cards that already cover it, so it
 *    needs no fade in. Birthing on its own side instead leaves a hole
 *    at dead centre that blinks open once every cycle.
 *
 * Every length is in `cqw` — a percentage of the container's width —
 * so the whole corridor keeps its proportions at any size. The
 * defaults were fitted numerically against a reference recording's
 * card-height and edge-position profile, not eyeballed.
 * ─────────────────────────────────────────────────────────────── */

/**
 * Geometry of the corridor. Every length is `cqw`, a percentage of the
 * container's width, so the shape is resolution-independent.
 *
 * These interact: the ribbon only stays solid while consecutive cards
 * overlap, which needs `exitHeight / birthHeight` spread over enough
 * `cards`. Raising `exitHeight`, dropping `cards`, or pulling `railExit`
 * in all push toward a visible tear near the frame edge.
 */
export type CorridorPath = {
  /** Strength of the projection. Lower is a wider-angle, more dramatic rush. @default 30 */
  perspective?: number;
  /** Card width in world units. @default 18 */
  cardWidth?: number;
  /** Card height in world units. @default 25 */
  cardHeight?: number;
  /** Corner radius applied to each card. @default 0.4 */
  cardRadius?: number;
  /** On-screen card height at the waist, where a card is born. @default 2.6 */
  birthHeight?: number;
  /** On-screen card height as a card leaves the frame. @default 46 */
  exitHeight?: number;
  /**
   * Lateral offset at birth. Negative starts the card across the axis so the
   * centre never opens up — see note 3 above. @default -11
   */
  railBirth?: number;
  /** Lateral offset once the rails have finished opening. @default 44 */
  railExit?: number;
  /** How front-loaded the opening is. >1 opens early then holds. @default 3.3 */
  fan?: number;
  /** Y-rotation at birth, degrees. @default 6 */
  turnBirth?: number;
  /** Y-rotation at exit, degrees. @default 28 */
  turnExit?: number;
  /** Keyframe stops used to trace the curve. Raise only if motion looks faceted. @default 24 */
  stops?: number;
};

const PATH: Required<CorridorPath> = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

/** Sample the path once so the CSS keyframes trace the real curve. */
function keyframes(dir: 1 | -1, name: string, p: Required<CorridorPath>) {
  const steps: string[] = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    // Geometric in apparent size, so consecutive cards keep a constant size
    // ratio and the ribbon stays solid at both ends.
    const scale =
      (p.birthHeight / p.cardHeight) *
      Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail =
      p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(
        2,
      )}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`,
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}


export type StreamImage = {
  /** The still. For a clip, its poster: shown first, and instead of the clip whenever video is off. */
  src: string;
  /** Only used if you drop the decorative treatment; the corridor is aria-hidden. */
  alt?: string;
  /** Optional short, silent, looping clip. Keep it small: it plays on a card, not full screen. */
  video?: string;
};

export type ImageStreamHeroProps = {
  /**
   * Media cycled onto the rails. Both rails run the same sequence, so the
   * corridor reads as one mirrored stream. Each card takes the next item every
   * time it loops back to the waist, so a list longer than `cards` is shown in
   * full over time rather than cut off.
   */
  images: StreamImage[];
  /**
   * Cards on each rail at once. More cards means a denser corridor, not a
   * faster one — spacing is derived from this and `speed`. Drop it far below
   * the default and consecutive cards grow too fast to stay overlapped near
   * the exit, which tears a gap in the ribbon.
   * @default 9
   */
  cards?: number;
  /**
   * Seconds for one card to travel the whole corridor.
   * @default 18
   */
  speed?: number;
  /**
   * Vertical placement of the corridor's axis, as a percentage of height.
   * A `--stream-axis` CSS variable (e.g. `48%`) on the root or any ancestor
   * overrides it, so the axis can move per breakpoint without a re-render.
   * @default 55
   */
  axis?: number;
  /**
   * Every Nth card on a rail is a clip, the rest are stills. Each clip card is
   * a video being decoded, twice over with both rails, so this is the knob
   * that sets the cost of the corridor.
   * @default 2
   */
  videoEvery?: number;
  /** The same below 768px wide, where decoding is what makes a phone stutter. @default 3 */
  videoEveryMobile?: number;
  /** Override any part of the corridor geometry. Merged over the defaults. */
  path?: CorridorPath;
  /** Content rendered above the corridor. */
  children?: React.ReactNode;
  className?: string;
};

/* ── video, cheaply ──────────────────────────────────────────────
 * Clips sit on fixed slots (every `videoEvery`th card), so the number of
 * videos decoding at once is capped no matter how many are in the list.
 * Until the page has loaded, and for good when the viewer asks for less
 * (reduced motion, Data Saver), a clip slot shows its poster instead —
 * the corridor paints from small stills and video never competes with
 * the first render. Off screen, every clip is paused.
 * ─────────────────────────────────────────────────────────────── */

const MOBILE = "(max-width: 767px)";

/** Media for card `i` on lap `lap`: clip slots walk the clips, the others walk the stills. */
function pick(
  i: number,
  lap: number,
  cards: number,
  every: number,
  clips: StreamImage[],
  stills: StreamImage[],
) {
  // With only one kind of media there is nothing to interleave.
  if (!clips.length || !stills.length) {
    const pool = clips.length ? clips : stills;
    return pool.length ? pool[(i + lap * cards) % pool.length] : undefined;
  }
  // Otherwise each kind walks its own pool, `slots` cards at a time, so no
  // two cards of a kind show the same item while the pool lasts.
  const clipSlot = i % every === 0;
  const pool = clipSlot ? clips : stills;
  const clipSlots = Math.ceil(cards / every);
  const slots = clipSlot ? clipSlots : cards - clipSlots;
  const rank = clipSlot ? i / every : i - Math.floor(i / every) - 1;
  return pool[(rank + lap * slots) % pool.length];
}

export function ImageStreamHero({
  images,
  cards = 9,
  speed = 18,
  axis = 55,
  videoEvery = 2,
  videoEveryMobile = 3,
  path,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & ImageStreamHeroProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);

  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      // Pausing rather than disabling keeps the corridor whole: every card is
      // already dropped mid-flight by its negative delay, so it freezes as a
      // finished still instead of collapsing onto the axis.
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p],
  );

  const clips = React.useMemo(() => images.filter((m) => m.video), [images]);
  const stills = React.useMemo(() => images.filter((m) => !m.video), [images]);

  const rootRef = React.useRef<HTMLDivElement>(null);
  // Server and first client render agree on the desktop layout and stills
  // only; the real values are read after mount.
  const [every, setEvery] = React.useState(Math.max(1, videoEvery));
  const [playing, setPlaying] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  // How many times each card has looped. Both rails share it, since card i on
  // either side is born at the same instant.
  const [laps, setLaps] = React.useState<number[]>(() => Array(cards).fill(0));

  React.useEffect(() => {
    setEvery(Math.max(1, window.matchMedia(MOBILE).matches ? videoEveryMobile : videoEvery));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData;
    if (reduced || saveData || !clips.length) return;
    // Let the page finish first, so clips never hold up the first paint.
    let timer = 0;
    const start = () => {
      timer = window.setTimeout(() => setPlaying(true), 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
    };
  }, [videoEvery, videoEveryMobile, clips.length]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    // A sliver left behind a fixed nav doesn't count as on screen.
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio >= 0.15),
      { threshold: [0, 0.15] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    rootRef.current?.querySelectorAll("video").forEach((v) => {
      if (visible) v.play().catch(() => {});
      else v.pause();
    });
  }, [visible, playing]);

  const nextLap = (i: number) =>
    setLaps((prev) => {
      const next = prev.length === cards ? [...prev] : Array(cards).fill(0);
      next[i] += 1;
      return next;
    });

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
      ref={rootRef}
      style={{ containerType: "inline-size", ...props.style }}
    >
      <style>{css}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% var(--stream-axis, ${axis}%)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[right, left].map((name) =>
            Array.from({ length: cards }, (_, i) => {
              // Both rails walk the same sequence, so the left side mirrors
              // the right at every depth.
              const media = pick(i, laps[i] ?? 0, cards, every, clips, stills);
              return (
                <div
                  key={`${name}-${i}`}
                  className={cn(card, "absolute overflow-hidden")}
                  // A card loops while it is a speck at the waist, behind the
                  // ones that cover the axis, so swapping its media there is
                  // never seen. One rail is enough to count laps.
                  onAnimationIteration={name === right ? () => nextLap(i) : undefined}
                  style={{
                    left: "50%",
                    top: `var(--stream-axis, ${axis}%)`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animation: `${name} ${speed}s linear infinite`,
                    // Negative delay drops each card mid-flight, so the
                    // corridor is already full on the first frame.
                    animationDelay: `${-(i * speed) / cards}s`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {media?.video && playing ? (
                    <video
                      key={media.video}
                      src={media.video}
                      poster={media.src}
                      autoPlay={visible}
                      muted
                      loop
                      playsInline
                      disablePictureInPicture
                      preload="auto"
                      className="h-full w-full object-cover"
                    />
                  ) : media ? (
                    <img
                      src={media.src}
                      alt={media.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  ) : null}
                </div>
              );
            }),
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

export default ImageStreamHero;
