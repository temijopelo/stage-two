"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";

const Navbar = () => {
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
    <nav className="w-full fixed flex items-center bg-navbar-primary z-50 h-18  ">
      <span className="flex-1 flex items-center justify-between gap-4 pr-5">
        <Image
          loading="eager"
          src={"/logo.svg"}
          alt="Logo"
          width={72}
          height={72}
        />
        <button
          type="button"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggleTheme}
          className="text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          {isDark ? <IoSunny size={22} /> : <IoMdMoon size={22} />}
        </button>
      </span>
      <hr className="border-[.5px] border-border/35 h-17.5" />
      <div className="px-5 ">
        <Image
          src={"/user_avatar.png"}
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navbar;
