import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/common/navbar";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Invoice Management Application",
  description: "HNG Stage 2 Task - Invoice Management Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={leagueSpartan.variable}>
      <body
        suppressHydrationWarning
        className={cn("min-h-screen", "font-league-spartan", "bg-background")}
      >
        <Navbar />

        {children}
      </body>
    </html>
  );
}
