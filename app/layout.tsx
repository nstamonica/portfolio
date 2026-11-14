import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CommandPalette } from "@/components/command-palette";
import { LiquidCanvas } from "@/components/liquid-canvas";
import { site } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  // Matches the liquid's darkest tone so mobile browser chrome blends in.
  themeColor: "#04050d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-CA" data-scroll-behavior="smooth" className={inter.variable}>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-[14px] focus:shadow-lg"
        >
          Skip to content
        </a>
        {/* The living wallpaper behind every page. */}
        <LiquidCanvas className="pointer-events-none fixed inset-0 -z-10" />
        <main id="main" className="flex-1">
          {children}
        </main>
        <CommandPalette />
      </body>
    </html>
  );
}
