import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import Sidebar from "@/components/layout/Sidebar";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"], // load đủ weight để dùng font-extralight, light, bold
  variable: "--font-roboto", // optional, để dùng CSS var
});

export const metadata: Metadata = {
  title: {
    default: "MAXIUS - HOME",
    template: "MAXIUS - %s",
  },
  description: "Maxius Landing Page!",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <div className="min-h-screen bg-white">
          <SidebarProvider totalSections={5}>
            <ThemeProvider>
              <Navbar />
              <Sidebar />
              <main className="w-full">{children}</main>
            </ThemeProvider>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
