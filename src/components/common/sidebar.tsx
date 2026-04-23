"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";

const Sidebar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  return (
    <nav className="min-h-screen w-18 flex flex-col justify-between items-center bg-navbar-primary z-50 rounded-r-3xl ">
      <Image
        loading="eager"
        src={"/logo.svg"}
        alt="Logo"
        width={72}
        height={72}
      />
      <div className="flex flex-col">
        <button
          type="button"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
          className="text-muted hover:text-foreground transition-colors cursor-pointer p-5 flex items-center justify-center"
        >
          {isDark ? <IoSunny size={22} /> : <IoMdMoon size={22} />}
        </button>
        <hr className="border-[.5px] border-border/35 rotate-180" />

        <div className="p-5 ">
          <Image
            src={"/user_avatar.png"}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
