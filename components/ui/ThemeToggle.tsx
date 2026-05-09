"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200/50 bg-white/50 text-zinc-500"
        aria-label="Toggle theme"
      >
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 overflow-hidden",
        "border border-zinc-200/50 hover:bg-zinc-100 hover:text-zinc-900",
        isDark ? "bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800 hover:text-white" : "bg-white/50 text-zinc-600"
      )}
      aria-label="Toggle theme"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{
            y: isDark ? -30 : 0,
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun size={20} weight="duotone" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            y: isDark ? 0 : 30,
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon size={20} weight="duotone" />
        </motion.div>
      </div>
    </button>
  );
}
