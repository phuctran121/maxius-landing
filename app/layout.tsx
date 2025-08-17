// app/layout.tsx
import "./globals.css";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "MAXIUS",
    template: "MAXIUS - %s",
  },
  description: "Maxius Landing Page!",
  twitter: {
    card: "summary_large_image",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
