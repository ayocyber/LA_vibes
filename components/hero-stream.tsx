import { ImageStreamHero, type StreamImage } from "@/components/ui/image-stream-hero";

// Everything here lives in public/hero, already cut down for the corridor:
// clips are 5s, silent, 360×500 (~100–400 KB), each with a matching poster;
// photos are 576×800. The full-size originals are in media-originals/.
// Order is the order they first appear, so the strongest go first.
const clip = (n: string, alt: string): StreamImage => ({
  src: `/hero/clip-${n}.jpg`,
  video: `/hero/clip-${n}.mp4`,
  alt,
});
const photo = (n: string, alt: string): StreamImage => ({ src: `/hero/photo-${n}.jpg`, alt });

const MEDIA: StreamImage[] = [
  clip("03", "Boat cruise hangout"),
  clip("05", "LA Vibes hyping the party"),
  clip("10", "Crowd in the red lights"),
  clip("01", "Guests dancing at a white party"),
  clip("04", "LA Vibes on the green-lit floor"),
  clip("12", "Eko in the Garden City, Port Harcourt"),
  clip("09", "Stage show"),
  clip("06", "Party games"),
  clip("07", "Hosting an indoor session"),
  clip("02", "Night set by the water"),
  clip("11", "House party"),
  clip("08", "LA Vibes backstage"),
  photo("06", "LA Vibes on the mic"),
  photo("01", "LA Vibes on stage, arm raised"),
  photo("02", "LA Vibes hosting in a waistcoat"),
  photo("07", "LA Vibes in the crowd with the mic"),
  photo("03", "LA Vibes raising the room"),
  photo("08", "ICS Outsourcing end of year party"),
  photo("04", "Love at the Bar flyer"),
  photo("10", "LA Vibes — Olaoluwa Oyewo"),
  photo("05", "The 9-5 All White Party flyer"),
  photo("09", "Boat Cruise x Dinner Date with Luscious Brand"),
];

// The first screen: event photos and clips streaming toward the viewer, with
// the headline above the corridor and the CTAs below it.
export function HeroStream() {
  return (
    <section id="hero">
      <ImageStreamHero images={MEDIA} className="h-full w-full bg-background">
        <div className="wrap hero-content">
          <div>
            <div className="kicker">MC · Hypeman · Event Host</div>
            <h1 className="hero-headline">
              <span className="line"><span>CORPORATE MIND.</span></span>
              <span className="line">
                <span>
                  <strong className="accent-word">ENTERTAINMENT</strong> ENERGY.
                </span>
              </span>
            </h1>
          </div>
          <div>
            <p className="hero-sub">
              LA Vibes brings energy, personality and professional event hosting to corporate events, weddings, concerts, brand activations and unforgettable celebrations.
            </p>
            <div className="hero-cta-row">
              <a href="#booking" className="btn magnetic">Book LA Vibes</a>
              <a href="#experience" className="btn btn-ghost magnetic">Explore Experience</a>
            </div>
          </div>
        </div>
        <div className="scroll-ind">
          <span className="stick" />
          SCROLL
        </div>
      </ImageStreamHero>
    </section>
  );
}
