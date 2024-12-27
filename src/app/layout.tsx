import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./components/Providers";
import AdSense from "./AdSense";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Leet Wars" as string,
  description: "Compare your LeetCode profiles with your friends, track progress, and analyze your coding performance together." as string,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Leet Wars",
    url: "https://leet-wars.vercel.app",
    description:
      "Compare your LeetCode profiles with your friends, track progress, and analyze your coding performance together.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://leet-wars.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <AdSense/>
        <link rel="icon" href="/icon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="LeetCode, coding, programming, compare profiles, analyze progress" />
        <meta name="author" content="Leet Wars Team" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Leet Wars" />
        <meta property="og:description" content="Compare your LeetCode profiles with your friends, track progress, and analyze your coding performance together." />
        <meta property="og:image" content="https://leet-wars.vercel.app/og-image.jpg" /> {/* Replace with an actual image */}
        <meta property="og:url" content="https://leet-wars.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://leet-wars.vercel.app" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
