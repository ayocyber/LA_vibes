import type { TestimonialCardProps } from "@/components/ui/testimonial-card";

// Client reviews, in the clients' own words. No photos on file, so the cards
// show initials; add `avatar: "/images/…"` to an author once we have one.
export const TESTIMONIALS: Omit<TestimonialCardProps, "className">[] = [
  {
    author: { name: "Uchenna Ogunedo Akingbade", handle: "Chairman, NBA Lagos Branch" },
    text: `Olaoluwa was the MC and hype man at the highly acclaimed NBA Lagos Branch Party in Port Harcourt - Eko in the Garden City, and he was absolutely fantastic.

He kept the audience engaged throughout and really understood the room. The fact that he's a lawyer himself was an added advantage because he was able to connect with members of the profession and bring that into his hyping and MCing.

He had great control of the room, kept the energy going, and we thoroughly enjoyed having him.

We'll definitely be using him again for future NBA Lagos Branch events, and I would highly recommend him for your parties and events. He's great at both MCing and hyping.`,
  },
  {
    author: { name: "Oluchi Obi", handle: "Event Manager, Natexperience" },
    text: `Olaoluwa Oyewo, popularly known as LA Vibes, was the hype man at my All White Party on March 28th, 2026, and he did an absolutely fantastic job.

He read the room perfectly and kept the energy high all through his set, making sure every guest stayed engaged from start to finish. His delivery, timing, and stage presence stood out so much that he received special recognition from the host for how well he carried the event.

I'll definitely be booking him again for future events, and I have no hesitation recommending him for MCing and hyping at your next party or occasion.`,
  },
  {
    author: { name: "Luscious Brand", handle: "Founder" },
    text: `Over the past couple of months LA Vibes has hosted multiple Luscious brand events, from Games Nights and Boat Cruises to Dinner Nights, and he did an absolutely amazing job.

What stands out most is his ability to bring complete strangers together and make them feel like they've known each other for years — a warm, welcoming environment filled with energy, laughter and unending vibes.

When it comes to hosting my events, I can't have anyone else doing it if it's not LA Vibes.`,
  },
];
