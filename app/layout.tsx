import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARIKA REALTY — Extraordinary Homes",
  description: "Exceptional homes, quietly discovered. Private real estate advisory across India and beyond.",
  icons: { icon: "/arika-logo-transparent.png", apple: "/arika-logo-transparent.png" },
  metadataBase: new URL("https://arikarealty.com"),
  openGraph: {
    title: "ARIKA REALTY — Extraordinary Homes",
    description: "Space to live. Room to become.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
