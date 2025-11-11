import ClerkProvider from '@/shared/lib/clerk';
import { ThemeProvider } from '@/shared/lib/next-themes';
import ReactQueryProvider from '@/shared/lib/react-query';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';

import './globals.css';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
});

// This is the single source of truth.
const canonicalDomain = 'https://theresumecraft.vercel.app';
const pageUrl = 'https://theresumecraft.vercel.app/landing';

// Define your core site details
const siteTitle =
  'ResumeCraft | Online Resume Builder for Modern, ATS-Friendly Resumes';
const siteDescription =
  'Build a job-winning resume in minutes with ResumeCraft. Our online resume builder features professional, ATS-friendly templates, real-time editing, and easy PDF export.';
const siteKeywords = [
  'resume builder',
  'online resume builder',
  'ATS-friendly resume',
  'professional resume templates',
  'cv builder',
  'resume maker',
  'create resume online',
  'build resume',
  'modern resume',
  'pdf resume',
  'ResumeCraft',
];

export const metadata: Metadata = {
  // --- Core SEO ---
  title: siteTitle,
  description: siteDescription,
  keywords: siteKeywords,

  // --- Canonical & Robots ---
  // metadataBase points to the *domain*
  metadataBase: new URL(canonicalDomain),
  // alternates.canonical points to the *specific page path*
  alternates: {
    canonical: '/landing', // This page's path
  },
  robots: {
    index: true, // We WANT this page indexed
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // --- Open Graph (Facebook, LinkedIn, etc.) ---
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: pageUrl, // The *full* URL to this specific page
    siteName: 'ResumeCraft',
    images: [
      {
        url: `${canonicalDomain}/og-image.png`, // Absolute URL to the image
        width: 1200,
        height: 630,
        alt: 'A preview of the ResumeCraft online resume builder interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // --- Twitter Card (X) ---
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [`${canonicalDomain}/og-image.png`], // Absolute URL
    creator: '@varadcodes',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
            </ReactQueryProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
