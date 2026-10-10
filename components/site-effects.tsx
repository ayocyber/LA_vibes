"use client";

// The page's behaviour, ported from the inline <script> of the original
// index.html. The markup is static, so this wires plain DOM listeners once on
// mount and removes them on unmount.
import { useEffect } from "react";

const WA_NUMBER = "2348115777463";

export function SiteEffects() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof HTMLElementEventMap>(
      el: HTMLElement | Window | Document | null,
      type: K | string,
      fn: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions,
    ) => {
      if (!el) return;
      el.addEventListener(type, fn, opts);
      cleanups.push(() => el.removeEventListener(type, fn, opts));
    };
    const $ = <T extends HTMLElement = HTMLElement>(id: string) =>
      document.getElementById(id) as T | null;

    // theme toggle
    const root = document.documentElement;
    const themeBtn = $("themeBtn");
    const iconMoon = $("iconMoon");
    const iconSun = $("iconSun");
    const applyTheme = (theme: "dark" | "light") => {
      if (theme === "dark") root.setAttribute("data-theme", "dark");
      else root.removeAttribute("data-theme");
      const isDark = theme === "dark";
      if (iconMoon) iconMoon.style.display = isDark ? "none" : "block";
      if (iconSun) iconSun.style.display = isDark ? "block" : "none";
      themeBtn?.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      try {
        localStorage.setItem("lavibes-theme", theme);
      } catch {}
    };
    applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
    on(themeBtn, "click", () => {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });

    // scroll progress + nav bg + back-to-top visibility
    const nav = $("nav");
    const progress = $("progress");
    const backTop = $("backTop");
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      nav?.classList.toggle("scrolled", y > 40);
      backTop?.classList.toggle("show", y > 700);
    };
    on(document, "scroll", onScroll, { passive: true });
    onScroll();

    // mobile menu
    const menuBtn = $("menuBtn");
    const mobileMenu = $("mobileMenu");
    on(menuBtn, "click", () => {
      const open = mobileMenu?.classList.toggle("open") ?? false;
      menuBtn?.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll<HTMLElement>(".mobileLink").forEach((a) =>
      on(a, "click", () => {
        mobileMenu?.classList.remove("open");
        menuBtn?.setAttribute("aria-expanded", "false");
      }),
    );

    // headline reveal (single orchestrated moment). The headline sits below the
    // wheel, so it plays when it scrolls into view rather than on load.
    const timers: number[] = [];
    const headline = document.querySelector(".hero-headline");
    if (headline) {
      const headlineIo = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          headlineIo.disconnect();
          headline.querySelectorAll(".line span").forEach((el, i) => {
            timers.push(window.setTimeout(() => el.classList.add("rev"), 220 + i * 140));
          });
        },
        { threshold: 0.4 },
      );
      headlineIo.observe(headline);
      cleanups.push(() => headlineIo.disconnect());
    }
    cleanups.push(() => timers.forEach((t) => window.clearTimeout(t)));

    // booking form -> opens WhatsApp with the details pre-filled
    const form = $<HTMLFormElement>("bookingForm");
    const val = (id: string) =>
      (document.getElementById(id) as HTMLInputElement | null)?.value.trim() ?? "";
    const prettyDate = (v: string) => {
      if (!v) return "";
      const d = new Date(v + "T00:00:00");
      return isNaN(d.getTime())
        ? v
        : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    };
    on(form, "submit", (e) => {
      e.preventDefault();
      const rows: [string, string][] = [
        ["Name", val("fname")],
        ["Email", val("femail")],
        ["Phone", val("fphone")],
        ["Event Type", val("ftype")],
        ["Event Date", prettyDate(val("fdate"))],
        ["Expected Guests", val("fguests")],
        ["Location", val("floc")],
        ["Details", val("fmsg")],
      ];
      const lines = ["Hello LA Vibes, I would like to book you for an event.", ""];
      rows.forEach(([k, v]) => {
        if (v) lines.push("*" + k + ":* " + v);
      });
      const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
      const note = form?.querySelector(".form-note");
      if (note) note.textContent = "Opening WhatsApp… tap Send there to deliver your request.";
      const w = window.open(url, "_blank");
      if (w) {
        try {
          w.opener = null;
        } catch {}
      } else {
        window.location.href = url;
      }
    });

    // scroll reveal for sections
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // back to top
    const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    on(backTop, "click", toTop);
    on(backTop, "keypress", (ev) => {
      if ((ev as KeyboardEvent).key === "Enter") toTop();
    });

    // magnetic buttons (desktop only, subtle)
    if (window.matchMedia("(min-width:900px)").matches) {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((btn) => {
        on(btn, "mousemove", (e) => {
          const r = btn.getBoundingClientRect();
          const x = (e as MouseEvent).clientX - r.left - r.width / 2;
          const y = (e as MouseEvent).clientY - r.top - r.height / 2;
          btn.style.transform = "translate(" + x * 0.18 + "px," + y * 0.28 + "px)";
        });
        on(btn, "mouseleave", () => {
          btn.style.transform = "translate(0,0)";
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
