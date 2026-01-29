import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "GoMAXPAIN Incident Dashboard",
  description:
    "GoMAXPAIN Incident Dashboard – real-time incident visualization and metrics for traffic operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-mono antialiased`}
      >
        {/* Google Maps API loaded via @googlemaps/js-api-loader in map.tsx */}
        {children}
      </body>
    </html>
  );
}
