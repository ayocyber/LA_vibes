"use client";

import { HeartHandshake, Music, PartyPopper, Presentation, Rocket, Trophy } from "lucide-react";
import ExperienceCards, { type ExperienceCard } from "@/components/ui/experience-cards";

// Picks the event type in the booking form so "Book this" lands pre-filled.
// `type` must match an <option> in #ftype.
const book = (type: string): ExperienceCard["cta"] => ({
  label: "Book this room",
  href: "#booking",
  onClick: () => {
    const select = document.getElementById("ftype") as HTMLSelectElement | null;
    if (select) select.value = type;
  },
});

const CARDS: ExperienceCard[] = [
  {
    icon: Presentation,
    title: "Conferences & Summits",
    blurb: "Structure, composure and the right energy between sessions, so the programme runs to time and the room stays with you.",
    features: ["Programme flow & stage management", "Panel & keynote moderation", "Q&A and audience engagement"],
    badge: "Most booked",
    featured: true,
    cta: book("Corporate"),
  },
  {
    icon: Trophy,
    title: "Award Nights & Corporate Dinners",
    blurb: "Polished, warm and quick on his feet. Every winner feels celebrated and the evening never drags.",
    features: ["Red carpet & arrival hosting", "Award presentations", "Pacing dinner, speeches & entertainment"],
    badge: "Signature",
    cta: book("Corporate"),
  },
  {
    icon: HeartHandshake,
    title: "Weddings & Owambe",
    blurb: "From the grand entrance to the last dance, he keeps families, friends and the dance floor moving as one.",
    features: ["Ceremony & reception MC", "Family & guest engagement", "Dance-floor energy till the end"],
    badge: "Most loved",
    cta: book("Wedding"),
  },
  {
    icon: Music,
    title: "Concerts, Raves & Festivals",
    blurb: "Full hypeman mode. He warms the crowd, bridges the sets and keeps the noise up until the headliner lands.",
    features: ["Crowd hype & call-and-response", "Artiste introductions & handovers", "Large-crowd control"],
    cta: book("Concert / Nightlife"),
  },
  {
    icon: Rocket,
    title: "Brand Activations & Launches",
    blurb: "Turns a product moment into a crowd moment that people film, share and remember the brand by.",
    features: ["Product reveals & unveilings", "Roadshows & store openings", "Games, giveaways & crowd interaction"],
    cta: book("Brand Activation"),
  },
  {
    icon: PartyPopper,
    title: "Private Parties & Birthdays",
    blurb: "Strangers become friends. A personal, high-energy host for the nights that are all about you.",
    features: ["Personalised hosting", "Party games & icebreakers", "Hype for the celebrant"],
    cta: book("Social / Private Party"),
  },
];

export function ExperienceSection() {
  return <ExperienceCards cards={CARDS} className="mt-14" />;
}
