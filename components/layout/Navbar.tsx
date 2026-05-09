"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  List,
  X,
  Briefcase,
  BookOpen,
  ClipboardText,
  House,
} from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "/", label: "Home", icon: House },
  { href: "/jobs", label: "Opportunities", icon: Briefcase },
  { href: "/notes", label: "Study Material", icon: BookOpen },
  { href: "/tests", label: "Practice Tests", icon: ClipboardText },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop Floating Pill ──────────────── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 flex justify-center pt-5 px-4 transition-all duration-500",
          scrolled && "pt-3"
        )}
      >
        <nav
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-700",
            "bg-white/70 backdrop-blur-2xl",
            "border border-zinc-200/60",
            "shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)]",
            scrolled &&
              "shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)] bg-white/80"
          )}
        >
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center pl-2 pr-4 md:pl-4 md:pr-6 overflow-hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div className="relative w-[110px] h-[40px] md:w-[130px] md:h-[48px] flex items-center">
              <Image 
                src="/logo.png" 
                alt="Opportunity Desk Logo" 
                fill
                className="object-contain mix-blend-multiply scale-[1.6] origin-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "text-accent"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-accent/8 border border-accent/15"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Admin Link */}
          <Link
            href="/admin/login"
            className="hidden md:flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white ml-2 transition-all duration-300 hover:bg-zinc-800 active:scale-[0.97]"
          >
            Admin
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-zinc-100 transition-fast ml-1"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <span
                className={cn(
                  "absolute left-0 top-[6px] w-5 h-[1.5px] bg-zinc-700 rounded-full transition-all duration-500",
                  mobileOpen && "rotate-45 top-[10px]"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 bottom-[6px] w-5 h-[1.5px] bg-zinc-700 rounded-full transition-all duration-500",
                  mobileOpen && "-rotate-45 bottom-[10px]"
                )}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* ── Mobile Overlay ─────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden bg-white/90 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.4,
                      ease: [0.32, 0.72, 0, 1] as const,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl px-8 py-4 text-lg font-medium transition-all duration-300",
                        isActive
                          ? "bg-accent/8 text-accent"
                          : "text-zinc-600 hover:bg-zinc-100"
                      )}
                    >
                      <Icon size={22} weight={isActive ? "fill" : "regular"} />
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{
                  delay: navLinks.length * 0.06,
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1] as const,
                }}
                className="mt-4"
              >
                <Link
                  href="/admin/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-zinc-800 active:scale-[0.97]"
                >
                  Admin Panel
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
