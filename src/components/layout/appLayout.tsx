// components/common/layout-shell.tsx
"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import Navbar from "@/components/common/navbar";
import Sidebar from "@/components/common/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 769px)");

  return (
    <body
      suppressHydrationWarning
      className={cn("min-h-screen bg-background font-league-spartan")}
    >
      {!isDesktop && <Navbar />}

      <div className="flex min-h-screen">
        {isDesktop && <Sidebar />}

        <main
          className={cn(
            "flex-1 min-h-screen bg-background",
            isDesktop ? "max-w-[70%] mx-auto pt-12 " : "px-4 pt-24",
          )}
        >
          {children}
        </main>
      </div>
    </body>
  );
}
