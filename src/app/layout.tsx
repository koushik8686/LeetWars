import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script"; // Import the Script component
import "./globals.css";
import Providers from "./components/Providers";
import AdSense from "./AdSense";

// --- Font Setup ---
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

// --- Enhanced SEO Metadata ---
export const metadata: Metadata = {
  metadataBase: new URL('https://leet-wars.vercel.app'),
  title: {
    default: "Leet Wars | Compare & Analyze LeetCode Profiles",
    template: "%s | Leet Wars",
  },
  description: "Compare your LeetCode profiles with friends, track progress, and analyze your coding performance together. Settle the score and find out who is the ultimate coder.",
  keywords: ["LeetCode", "Leetcode Compare", "Leetcode Analysis", "Coding Profile", "Programming Contest", "Code Wars", "Developer Stats", "Technical Interview"],
  authors: [{ name: "Leet Wars Team", url: "https://leet-wars.vercel.app" }],
  creator: "Leet Wars Team",
  manifest: '/site.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Leet Wars: Settle the Coding Score",
    description: "Compare LeetCode profiles with your friends, track progress, and analyze your coding performance together.",
    url: "https://leet-wars.vercel.app",
    siteName: 'Leet Wars',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Leet Wars - LeetCode Profile Comparison Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Leet Wars: Settle the Coding Score",
    description: "Compare LeetCode profiles with friends, track progress, and analyze coding performance.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
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
    description: "Compare your LeetCode profiles with your friends, track progress, and analyze your coding performance together.",
    applicationCategory: "DeveloperTool",
    operatingSystem: "All",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://leet-wars.vercel.app/compare?user1={user1_username}&user2={user2_username}",
      "query-input": [
        "required name=user1_username",
        "required name=user2_username"
        ],
    },
  };

  return (
    <html lang="en">
      <head>
        <AdSense />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics Scripts using next/script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-8PZTQRNPYG`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8PZTQRNPYG');
            `,
          }}
        />
        
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}