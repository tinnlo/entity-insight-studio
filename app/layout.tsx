import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Entity Insight Studio",
  description:
    "A focused Next.js studio for exploring entity metrics, relationship graphs, and time-based insights from a small fixture-backed dataset.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.18),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_45%,#ecfeff_100%)] text-slate-950">
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
