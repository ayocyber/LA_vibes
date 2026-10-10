"use client";

import React, { useState, useEffect, useRef, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

// Define the type for a single gallery item
export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    /** Photo credit. Omit to hide the credit line. */
    by?: string;
  };
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
  /**
   * Element whose scroll-through drives one full turn. Defaults to the whole
   * page, which only makes sense when the gallery is the page.
   */
  scrollTrackRef?: React.RefObject<HTMLElement | null>;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, scrollTrackRef, ...props }, ref) => {
    // Rotation is scroll position plus whatever auto-rotation has accumulated,
    // so the ring picks up from where it drifted instead of snapping back.
    const [scrollRotation, setScrollRotation] = useState(0);
    const [autoOffset, setAutoOffset] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const update = () => setReduceMotion(mq.matches);
      update();
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }, []);

    // Effect to handle scroll-based rotation
    useEffect(() => {
      const progress = () => {
        const track = scrollTrackRef?.current;
        if (track) {
          const rect = track.getBoundingClientRect();
          const scrollable = rect.height - window.innerHeight;
          return scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
        }
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        return scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      };

      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        setScrollRotation(progress() * 360);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      setScrollRotation(progress() * 360);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [scrollTrackRef]);

    // Effect for auto-rotation when not scrolling
    useEffect(() => {
      if (isScrolling || reduceMotion || autoRotateSpeed === 0) return;

      const autoRotate = () => {
        setAutoOffset((prev) => prev + autoRotateSpeed);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, reduceMotion, autoRotateSpeed]);

    const rotation = scrollRotation + autoOffset;
    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{ perspective: "2000px" }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className="absolute w-[300px] h-[400px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: "50%",
                  top: "50%",
                  marginLeft: "-150px",
                  marginTop: "-200px",
                  opacity: opacity,
                  transition: "opacity 0.3s linear",
                }}
              >
                <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-border bg-card/70 dark:bg-card/30 backdrop-blur-lg">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || "center" }}
                  />
                  {/* Replaced text-primary-foreground with text-white for consistent color */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h2 className="text-xl font-bold">{item.common}</h2>
                    <em className="text-sm italic opacity-80">{item.binomial}</em>
                    {item.photo.by && <p className="text-xs mt-2 opacity-70">Photo by: {item.photo.by}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
