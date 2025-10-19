import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProvider from "./providers/SessionProvider";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIC Recruitments '25",
  description: "Recruitment Portal for the AIC Club of VIT Chennai",
  openGraph: {
    title: "AIC Recruitments '25",
    description: "Recruitment Portal for the AIC Club, VIT Chennai",
    url: "https://recruitments.aiclubvitc.in/",
    siteName: "AIC Recruitments '25",
    images: [
      {
        url: "https://recruitments.aiclubvitc.in/og-image.png", // full absolute path!
        width: 1200,
        height: 630,
        alt: "AIC Recruitment Portal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIC Recruitments '25",
    description: "Recruitment Portal for the AIC Club, VIT Chennai",
    images: ["https://recruitments.aiclubvitc.in/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  flex flex-col cursor-none min-h-screen  antialiased`}
      >
        <SessionProvider>
          <CustomCursor />
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
