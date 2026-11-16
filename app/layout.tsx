import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { CommandPalette } from "@/components/command-palette";
import { CursorChip } from "@/components/cursor-chip";
import { site } from "@/lib/content";
import { DECK_QUERY } from "@/lib/deck";
import "./globals.css";

// The fixed weights the site uses (medium text, semibold names, bold numbers).
// Fixed cuts, as on brandondavid.dev, render a touch darker and crisper on
// Windows than the variable font does at the same weight.
const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// The wordmark and the closing line.
const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

// Every route is fully prerendered at build time — no request-time rendering.
// The build fails if anything would make a page dynamic.
export const ensureStatic = "navigation";

// Set NEXT_PUBLIC_SITE_URL to your domain when deploying anywhere other than
// Vercel (Vercel fills this in automatically) so social previews resolve.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  keywords: [
    site.name,
    "cybersecurity",
    "security analyst",
    "software engineer",
    "Carleton University",
    "Ottawa",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  // The paper, so mobile browser chrome blends in.
  themeColor: "#eeeee0",
};

// Runs before the first paint: on laptops and desktops the page opens as the
// panel deck straight away instead of flashing as a long scroll first. If the
// deck never starts (scripts blocked or failed), normal scrolling comes back.
const deckBootstrap = `(function(){try{if(matchMedia(${JSON.stringify(DECK_QUERY)}).matches){var d=document.documentElement;d.classList.add("deck-on");setTimeout(function(){if(!window.__deckReady)d.classList.remove("deck-on")},6000)}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${serif.variable}`}
      // The bootstrap script adds a class to <html> before React hydrates.
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: deckBootstrap }} />
        <main id="main">{children}</main>
        <CursorChip />
        <CommandPalette />
      </body>
    </html>
  );
}
