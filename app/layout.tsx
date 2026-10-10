import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "LA Vibes | MC, Hypeman & Event Host in Nigeria",
  description:
    "LA Vibes is a Nigerian MC, Hypeman and Event Host delivering unforgettable experiences for corporate events, weddings, concerts, brand activations, parties and celebrations.",
  alternates: { canonical: "https://example.com/" },
  openGraph: {
    type: "website",
    title: "LA Vibes | MC, Hypeman & Event Host in Nigeria",
    description:
      "Corporate mind. Entertainment energy. Book LA Vibes — Olaoluwa Oyewo — for your next event in Nigeria.",
    url: "https://example.com/",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "LA Vibes | MC, Hypeman & Event Host",
    description: "Corporate mind. Entertainment energy. Book LA Vibes for your next event.",
    site: "@its_vibesbaby",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Olaoluwa Oyewo",
  alternateName: "LA Vibes",
  jobTitle: "MC, Hypeman & Event Host",
  url: "https://example.com/",
  sameAs: ["https://www.instagram.com/iam_lavibes/", "https://x.com/its_vibesbaby"],
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
  email: "lavibessmlentertainment@gmail.com",
  telephone: "+2348115777463",
};

// Dark is the default (set on <html> below); this drops it before first paint
// only for visitors who picked light, so neither theme flashes.
const themeScript = `try{if(localStorage.getItem('lavibes-theme')==='light')document.documentElement.removeAttribute('data-theme')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
