import { SiteEffects } from "@/components/site-effects";
import { HeroStream } from "@/components/hero-stream";
import HeroFashion from "@/components/ui/hero-fashion";
import { ExperienceSection } from "@/components/experience-section";
import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";
import { TESTIMONIALS } from "@/components/testimonials";
import { BookingSection } from "@/components/booking-section";

const WA_LINK =
  "https://wa.me/2348115777463?text=Hello%20LA%20Vibes%2C%20I%20would%20like%20to%20enquire%20about%20booking%20you%20for%20my%20event.";

const fill = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  inset: 0,
} as const;

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div id="progress" />

      <nav id="nav">
        <div className="wrap nav-inner">
          <a href="#hero" className="logo">
            <img src="/images/logo.png" alt="LA Vibes logo" /> LA VIBES<span className="dot">.</span>
          </a>
          <div className="nav-links">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#testimonial">Testimonials</a>
          </div>
          <button id="themeBtn" aria-label="Switch to light mode" title="Switch theme">
            <svg id="iconMoon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ display: "none" }}>
              <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
            </svg>
            <svg id="iconSun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="4.5" />
              <path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8L6 18M18 6l1.8-1.8" />
            </svg>
          </button>
          <a href="#booking" className="btn nav-cta magnetic">
            Book LA Vibes
          </a>
          <button id="menuBtn" aria-label="Open menu" aria-expanded="false">
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div id="mobileMenu">
        <div>
          <a href="#hero" className="mobileLink">Home</a>
          <a href="#about" className="mobileLink">About</a>
          <a href="#experience" className="mobileLink">Experience</a>
          <a href="#testimonial" className="mobileLink">Testimonials</a>
          <a href="#booking" className="mobileLink">Book</a>
        </div>
        <div style={{ fontSize: 13, color: "var(--fg-faint)" }}>Lagos, Nigeria — @iam_lavibes</div>
      </div>

      <main id="main">
        <HeroStream />

        <section id="about">
          <div className="wrap reveal">
            <div className="eyebrow" style={{ marginBottom: 32 }}>About</div>
            <HeroFashion
              titleAs="h2"
              title={<>The man behind<br />the energy.</>}
              image="/images/hero-portrait.jpg"
              imageAlt="LA Vibes — Olaoluwa Oyewo"
              kicker={<>Corporate mind.<br />Entertainment energy.</>}
            >
              <div className="about-copy">
                <p>LA Vibes, professionally known as Olaoluwa Oyewo, is a Nigerian MC, Hypeman and Event Host passionate about creating unforgettable experiences through energy, personality, crowd engagement and professional event management.</p>
                <p>With the ability to adapt to different audiences and environments, LA Vibes brings a distinctive blend of entertainment, confidence and professionalism to every event — from corporate gatherings and brand activations to weddings, concerts, parties and nightlife experiences. He understands how to read the room, connect with the audience and deliver the right energy for every occasion.</p>
                <p>Beyond entertainment, Olaoluwa is also a qualified Nigerian lawyer, bringing the communication skills, composure and professional discipline of the corporate world into the entertainment space.</p>
              </div>
              <span className="lawyer-pill">Qualified Nigerian Lawyer</span>
            </HeroFashion>
          </div>
        </section>

        <section id="experience">
          <div className="wrap">
            <div className="reveal">
              <div className="eyebrow">Selected Experience</div>
              <h2 className="h2">Recent rooms<br />LA Vibes has run.</h2>
            </div>
            <div style={{ marginTop: 56 }}>
              <div className="case reveal">
                <div className="case-media">
                  <img src="/images/case-ics.jpg" alt="ICS Outsourcing Nigeria Limited end of year party" style={fill} />
                </div>
                <div>
                  <div className="case-tag">Case Study 01</div>
                  <div className="case-title">ICS Outsourcing Nigeria Limited — End of Year Party</div>
                  <p className="case-desc">The event was a celebration marking the close of a successful work calendar, thoughtfully themed around the rich cultural concept of Ojude Oba. With employees transitioning from their professional work environment into a relaxed, celebratory atmosphere, the event required the right blend of energy, engagement and entertainment to set the tone. LA Vibes brought exactly that — connecting with employees and seamlessly transforming the room from work mode to party mode.</p>
                  <div className="case-meta">
                    <div>Type<strong>Corporate</strong></div>
                    <div>Location<strong>Lagos</strong></div>
                    <div>Role<strong>MC / Event Host</strong></div>
                    <div>Year<strong>2025</strong></div>
                  </div>
                  <a className="case-link" href="https://drive.google.com/drive/folders/12UKapRq2sRrwECs-T-lb37gSqQTYNu6a" target="_blank" rel="noopener">View event media ↗</a>
                </div>
              </div>

              <div className="case reveal">
                <div className="case-media">
                  <video src="/images/case-eko-web.mp4" poster="/images/case-eko-poster.jpg" style={fill} autoPlay loop muted playsInline preload="metadata" />
                </div>
                <div>
                  <div className="case-tag">Case Study 02</div>
                  <div className="case-title">Eko in the Garden City</div>
                  <p className="case-desc">The NBA Annual General Conference was held in Port Harcourt, bringing together lawyers from across Nigeria. In celebration, the NBA Lagos Branch hosted a special party dedicated to its members and to the profession. With a room full of accomplished professionals ready to unwind, LA Vibes brought the balance of energy, entertainment and crowd engagement that turned the celebration into an unforgettable night.</p>
                  <div className="case-meta">
                    <div>Type<strong>Concert</strong></div>
                    <div>Location<strong>Port Harcourt</strong></div>
                    <div>Role<strong>MC / Hypeman</strong></div>
                    <div>Year<strong>2026</strong></div>
                  </div>
                  <a className="case-link" href="https://www.instagram.com/reel/Dcg9qoZIz2g/?stkn=MXRwNjZzdGpndXVrNw==" target="_blank" rel="noopener">Watch on Instagram ↗</a>
                </div>
              </div>

              <div className="case reveal">
                <div className="case-media">
                  <img src="/images/case-luscious.jpg" alt="Boat Cruise x Dinner Date with Luscious Brand" style={fill} />
                </div>
                <div>
                  <div className="case-tag">Case Study 03</div>
                  <div className="case-title">Boat Cruise x Dinner Date with Luscious Brand</div>
                  <p className="case-desc">Luscious Brand operates within the catering and food industry, creating memorable culinary experiences for its customers, including games nights, dinner events and boat cruises. These experiences require more than entertainment — they require a host who can combine coordination, professionalism, personality and audience engagement. LA Vibes brought that combination, keeping the atmosphere lively from start to finish.</p>
                  <div className="case-meta">
                    <div>Type<strong>Brand Activation</strong></div>
                    <div>Location<strong>Lagos</strong></div>
                    <div>Role<strong>MC / Event Host</strong></div>
                    <div>Year<strong>2026</strong></div>
                  </div>
                  <a className="case-link" href="https://www.instagram.com/reel/DVA90kqjLRy/?stkn=MWRybjNmbDg4cHNuZQ==" target="_blank" rel="noopener">Watch on Instagram ↗</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="categories">
          <div className="wrap">
            <div className="reveal">
              <div className="eyebrow">Event Categories</div>
              <h2 className="h2">Built for<br />every room.</h2>
            </div>
            <ExperienceSection />
          </div>
        </section>

        <TestimonialsSection
          id="testimonial"
          eyebrow={<div className="eyebrow">Client Love</div>}
          title="Rooms that rate him."
          description="Hosts, brands and organisers on what it's like to have LA Vibes on the mic."
          testimonials={TESTIMONIALS}
        />

        <section id="manifesto">
          <div className="wrap reveal">
            <div className="eyebrow">Not Just a Microphone</div>
            <p style={{ maxWidth: 640, marginTop: 20, fontSize: 17, color: "var(--fg-dim)", lineHeight: 1.7 }}>
              An event host is more than the person holding the mic. LA Vibes brings together energy, crowd awareness, entertainment and professionalism to create an experience that feels intentional from beginning to end — whether the room requires corporate finesse, wedding charisma, street energy or full concert madness.
            </p>
            <div className="manifesto-line" style={{ marginTop: 48 }}>
              Your event.<br />My energy.<br />
              <span style={{ color: "var(--accent)" }}>One unforgettable<br />experience.</span>
            </div>
          </div>
        </section>

        <BookingSection waLink={WA_LINK} />
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div className="foot-logo" style={{ display: "flex", alignItems: "center", gap: 22 }}>
              <img src="/images/logo.png" alt="LA Vibes logo" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
              LA VIBES
            </div>
            <div className="foot-cols">
              <div className="foot-col">
                <h5>Navigate</h5>
                <a href="#about">About</a>
                <a href="#experience">Experience</a>
                <a href="#booking">Book</a>
              </div>
              <div className="foot-col">
                <h5>Contact</h5>
                <a href="tel:+2348115777463">0811 577 7463</a>
                <a href="mailto:lavibessmlentertainment@gmail.com">Email</a>
              </div>
              <div className="foot-col">
                <h5>Social</h5>
                <a href="https://www.instagram.com/iam_lavibes/" target="_blank" rel="noopener">Instagram</a>
                <a href="https://x.com/its_vibesbaby" target="_blank" rel="noopener">X</a>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <div>MC · Hypeman · Event Host — Lagos, Nigeria</div>
            <div>© 2026 LA Vibes. All rights reserved.</div>
          </div>
        </div>
      </footer>

      <div id="backTop" role="button" aria-label="Back to top" tabIndex={0}>↑</div>
      <a id="waFloat" href={WA_LINK} target="_blank" rel="noopener" aria-label="WhatsApp LA Vibes">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.1-1.34A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.6 0-3.1-.42-4.4-1.16l-.32-.18-3.03.8.81-2.95-.2-.32A7.96 7.96 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.4-5.9c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41-.14-.01-.3-.01-.46-.01s-.42.06-.64.3c-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28z" />
        </svg>
      </a>

      <a id="mobileBook" href="#booking" className="btn">Book LA Vibes</a>

      <SiteEffects />
    </>
  );
}
