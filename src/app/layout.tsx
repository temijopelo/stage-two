// app/layout.tsx
import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/layout/appLayout";

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
  const themeScript = `(() => {
  try {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', useDark);
  } catch (_) {}
})();`;

  return (
    <html lang="en" suppressHydrationWarning className={leagueSpartan.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <AppLayout>{children}</AppLayout>
    </html>
  );
}
