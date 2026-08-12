import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AnnouncementBar, SiteFooter, SiteNav } from "@/components/site/chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://bluebeakcapital.com"),
  title: {
    default: "BlueBeak Capital | Fly Above The Markets",
    template: "%s | BlueBeak Capital",
  },
  description:
    "Prop trading firm funding traders worldwide: pass the challenge, trade up to $500K, and keep up to 100% of profits.",
  openGraph: {
    type: "website",
    siteName: "BlueBeak Capital",
    title: "BlueBeak Capital | Fly Above The Markets",
    description:
      "Prop trading firm funding traders worldwide: pass the challenge, trade up to $500K, and keep up to 100% of profits.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  icons: {
    icon: "/assets/brand/favicon-32.png",
    apple: "/assets/brand/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#050E1F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <head>
        <link
          rel="preload"
          href="/assets/fonts/bebas-neue.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/inter-tight-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bb-page">
        <AnnouncementBar />
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
