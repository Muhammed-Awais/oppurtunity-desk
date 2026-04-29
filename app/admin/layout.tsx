"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  House,
  Briefcase,
  PlusCircle,
  BookOpen,
  ClipboardText,
  SignOut,
  List,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: House },
  { href: "/admin/jobs", label: "Manage Jobs", icon: Briefcase },
  { href: "/admin/post", label: "Post New", icon: PlusCircle },
];

import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Skip layout for the login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
    if (!loading && user && isLoginPage) {
      router.push("/admin");
    }
  }, [user, loading, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Login page renders without admin chrome
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state
  if (authenticated === null) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-zinc-50">
        <div className="h-8 w-8 rounded-full border-2 border-zinc-200 border-t-accent animate-spin" />
      </div>
    );
  }

  // Not authenticated
  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-[100dvh] flex bg-zinc-50">
      {/* ── Sidebar (Desktop) ─────────────────── */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-zinc-100 fixed inset-y-0 left-0 z-20">
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-zinc-100">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
            OD
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-900 tracking-tight leading-none">
              Opportunity Desk
            </p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-accent/8 text-accent"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                )}
              >
                <Icon
                  size={20}
                  weight={isActive ? "fill" : "regular"}
                />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-zinc-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-500 hover:bg-rose-50 hover:text-rose-600 transition-all duration-300"
          >
            <SignOut size={20} weight="regular" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile Header ─────────────────────── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-2xl border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
            OD
          </span>
          <span className="text-sm font-semibold text-zinc-900">Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-zinc-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <X size={20} weight="bold" className="text-zinc-600" />
          ) : (
            <List size={20} weight="bold" className="text-zinc-600" />
          )}
        </button>
      </div>

      {/* ── Mobile Sidebar Overlay ─────────────── */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-25 w-64 bg-white border-r border-zinc-100 md:hidden pt-16 flex flex-col">
            <nav className="flex-1 px-3 py-4 space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300",
                      isActive
                        ? "bg-accent/8 text-accent"
                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                    )}
                  >
                    <Icon
                      size={20}
                      weight={isActive ? "fill" : "regular"}
                    />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-3 py-4 border-t border-zinc-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-500 hover:bg-rose-50 hover:text-rose-600 transition-all duration-300"
              >
                <SignOut size={20} weight="regular" />
                Sign Out
              </button>
            </div>
          </aside>
        </>
      )}

      {/* ── Main Content ──────────────────────── */}
      <main className="flex-1 md:ml-64 min-h-[100dvh]">
        <div className="pt-16 md:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
