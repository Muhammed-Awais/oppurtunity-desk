import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { JsonLd, generateWebSiteSchema, generateOrganizationSchema, SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Opportunity Desk — Scholarships, Jobs & Test Prep in Pakistan",
    template: "%s | Opportunity Desk",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "scholarships in Pakistan",
    "jobs in Pakistan",
    "government jobs Pakistan",
    "CSS preparation",
    "NTS test preparation",
    "GAT preparation",
    "MDCAT preparation",
    "MCQs online",
    "past papers Pakistan",
    "mock tests CSS",
    "study notes Pakistan",
    "HEC scholarships 2026",
    "international scholarships",
    "PPSC jobs",
    "FPSC jobs",
    "entry test preparation",
    "competitive exam Pakistan",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: SITE_NAME,
    title: "Opportunity Desk — Scholarships, Jobs & Test Prep in Pakistan",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Opportunity Desk — Pakistan's Student Opportunity Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Opportunity Desk — Scholarships, Jobs & Test Prep",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "z0NCjGHGfSMmq4RxWaMgdfxezDPx-n2Nj4gITaciqNM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] flex flex-col transition-colors duration-500">
        {/* JSON-LD Structured Data — Site-wide */}
        <JsonLd data={generateWebSiteSchema()} />
        <JsonLd data={generateOrganizationSchema()} />

        {/* Noise overlay — fixed, pointer-events-none */}
        <div className="noise-overlay" aria-hidden="true" />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
