import type { ReactNode } from "react";
import { ArrowUpRight, CalendarDays, ChevronDown, Mail, MapPin, PhoneCall, Send, Users } from "lucide-react";

// Brand marks lucide doesn't ship.
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.1-1.34A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.6 0-3.1-.42-4.4-1.16l-.32-.18-3.03.8.81-2.95-.2-.32A7.96 7.96 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.4-5.9c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41-.14-.01-.3-.01-.46-.01s-.42.06-.64.3c-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
    <path d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.2 22H3.1l7.3-8.3L1 2h6.4l4.4 5.8L18.9 2zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20z" />
  </svg>
);

function ContactCard({
  href,
  icon,
  label,
  value,
  small,
  action,
  featured,
  external,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  /** Smaller value text, for long values like the email. */
  small?: boolean;
  action: string;
  featured?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={`bk-card${featured ? " featured" : ""}`}
    >
      <span className="bk-icon">{icon}</span>
      <span className="bk-body">
        <span className="bk-label">{label}</span>
        <span className={`bk-value${small ? " sm" : ""}`}>
          {/* let an email wrap before the @ rather than mid-word */}
          {value.includes("@") ? <>{value.split("@")[0]}<wbr />@{value.split("@")[1]}</> : value}
        </span>
        <span className="bk-action">
          {action} <ArrowUpRight size={15} />
        </span>
      </span>
    </a>
  );
}

// Booking: contact cards on the left, enquiry form on the right. The form's
// ids are read by SiteEffects, which turns a submit into a WhatsApp message;
// #ftype is also pre-set by the "Book this room" links on the service cards.
export function BookingSection({ waLink }: { waLink: string }) {
  return (
    <section id="booking">
      <div className="wrap">
        <div className="bk-head reveal">
          <div className="avail"><span className="dotpulse" />Available for bookings</div>
          <h2 className="h2">Let&apos;s create something<br />unforgettable.</h2>
          <p>Send the details of your event and LA Vibes will get back to you with availability.</p>
        </div>

        <div className="bk-grid">
          <div className="bk-contacts reveal">
            <ContactCard
              featured
              external
              href={waLink}
              icon={<WhatsAppIcon />}
              label="WhatsApp · Fastest reply"
              value="0811 577 7463"
              action="Start a chat"
            />
            <ContactCard
              href="tel:+2348115777463"
              icon={<PhoneCall size={20} strokeWidth={1.8} />}
              label="Call direct"
              value="0811 577 7463"
              action="Call now"
            />
            <ContactCard
              href="mailto:lavibessmlentertainment@gmail.com"
              icon={<Mail size={20} strokeWidth={1.8} />}
              label="Email"
              value="lavibessmlentertainment@gmail.com"
              small
              action="Send email"
            />
            <div className="bk-social">
              <span className="bk-label">Follow the energy</span>
              <div>
                <a href="https://www.instagram.com/iam_lavibes/" target="_blank" rel="noopener"><InstagramIcon />@iam_lavibes</a>
                <a href="https://x.com/its_vibesbaby" target="_blank" rel="noopener"><XIcon />@its_vibesbaby</a>
              </div>
            </div>
          </div>

          <form className="bk-form reveal" id="bookingForm">
            <div className="bk-form-head">
              <h3>Booking enquiry</h3>
              <p>Opens WhatsApp with your details filled in.</p>
            </div>
            <div className="field-row">
              <div className="field"><label htmlFor="fname">Full name</label><input id="fname" type="text" placeholder="Your name" autoComplete="name" required /></div>
              <div className="field"><label htmlFor="femail">Email</label><input id="femail" type="email" placeholder="you@email.com" autoComplete="email" required /></div>
            </div>
            <div className="field-row">
              <div className="field"><label htmlFor="fphone">Phone number</label><input id="fphone" type="tel" placeholder="+234" autoComplete="tel" /></div>
              <div className="field">
                <label htmlFor="ftype">Event type</label>
                <div className="field-icon">
                  <select id="ftype">
                    <option>Corporate</option><option>Wedding</option><option>Concert / Nightlife</option>
                    <option>Brand Activation</option><option>Social / Private Party</option><option>Other</option>
                  </select>
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="fdate">Event date</label>
                <div className="field-icon"><input id="fdate" type="date" /><CalendarDays size={16} /></div>
              </div>
              <div className="field">
                <label htmlFor="fguests">Expected guests</label>
                <div className="field-icon"><input id="fguests" type="number" min={1} placeholder="e.g. 200" /><Users size={16} /></div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="floc">Event location</label>
              <div className="field-icon"><input id="floc" type="text" placeholder="City, venue" /><MapPin size={16} /></div>
            </div>
            <div className="field"><label htmlFor="fmsg">Tell us about your event</label><textarea id="fmsg" rows={4} placeholder="The occasion, the crowd, the vibe you want…" /></div>
            <button type="submit" className="btn magnetic bk-submit">
              Send enquiry on WhatsApp <Send size={16} />
            </button>
            <div className="form-note">&nbsp;</div>
          </form>
        </div>
      </div>
    </section>
  );
}
