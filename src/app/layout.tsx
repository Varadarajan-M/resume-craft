import PosthogIdentify from "@/shared/components/common/PosthogIdentify";
import ClerkProvider from "@/shared/lib/clerk";
import { ThemeProvider } from "@/shared/lib/next-themes";
import ReactQueryProvider from "@/shared/lib/react-query";

import { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

import JsonLd from "@/shared/components/common/JsonLd";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
});

const canonicalDomain = "https://theresumecraft.vercel.app";

// Define your core site details
const siteTitle =
  "ResumeCraft | Free Online AI Resume Builder | ATS-Friendly Templates";
const siteDescription =
  "Build job-winning, professional, and ATS-friendly resumes in minutes with ResumeCraft. Our AI-powered resume builder offers modern templates, real-time previews, and easy PDF export—all for free.";
const siteKeywords = [
  "free resume builder",
  "AI resume builder",
  "ATS-friendly resume templates",
  "online resume maker",
  "professional cv builder",
  "best resume creator",
  "create resume online free",
  "build professional resume",
  "modern resume design",
  "pdf resume export",
  "ResumeCraft",
];

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  // --- Core SEO ---
  title: {
    default: siteTitle,
    template: `%s | ResumeCraft`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: "Varadarajan M", url: "https://www.varadarajan-m.dev" }],
  creator: "Varadarajan M",

  // --- Canonical & Robots ---
  metadataBase: new URL(canonicalDomain),
  alternates: {
    canonical: "/",
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

  // --- Open Graph (Facebook, LinkedIn, etc.) ---
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: canonicalDomain,
    siteName: "ResumeCraft",
    images: [
      {
        url: `${canonicalDomain}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ResumeCraft - Craft Your Perfect Resume in Minutes",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // --- Twitter Card (X) ---
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [`${canonicalDomain}/og-image.png`],
    creator: "@varadcodes",
  },

  // --- Icons ---
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
        <meta
          name="google-site-verification"
          content="ortnx0Fdg5YPFQUzqs4dSoOeSi-OBHREVU-cnmkd8ZE"
        />
      </head>
      <body className={`${poppins.className} font-sans antialiased`}>
        <ThemeProvider>
          <ClerkProvider>
            <ReactQueryProvider>
              {children}

              <Toaster
                position="bottom-center"
                className="z-[99999999999999999999999] mt-3"
                duration={2000}
              />
              <PosthogIdentify />
            </ReactQueryProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
