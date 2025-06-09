import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResumeCraft – Build Stunning Resumes Effortlessly",
  description:
    "Create professional, ATS-friendly resumes with ease using ResumeCraft. Choose from modern templates, edit in real-time, and export high-quality PDFs. Simple, fast, and beautifully designed.",
  keywords: [
    "resume builder",
    "cv builder",
    "professional resume",
    "online resume editor",
    "resume templates",
    "build resume",
    "modern resume generator",
    "pdf resume maker",
    "ResumeCraft",
    "create resume online",
  ],
  metadataBase: new URL("https://resumecraft.app"), // replace with your actual domain
  openGraph: {
    title: "ResumeCraft – Build Stunning Resumes Effortlessly",
    description:
      "Design, edit, and export beautiful resumes in minutes. With live preview, modern templates, and dark mode – ResumeCraft helps you land the job.",
    url: "https://resumecraft.app",
    siteName: "ResumeCraft",
    images: [
      {
        url: "https://resumecraft.app/og-image.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "ResumeCraft – Resume Builder Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeCraft – Build Stunning Resumes Effortlessly",
    description:
      "Design, edit, and export beautiful resumes in minutes. With live preview, modern templates, and dark mode – ResumeCraft helps you land the job.",
    images: ["https://resumecraft.app/og-image.png"], // replace with actual image
    creator: "@varadcodes", // optional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
