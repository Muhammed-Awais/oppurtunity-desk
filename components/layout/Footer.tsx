import Link from "next/link";
import {
  Briefcase,
  BookOpen,
  ClipboardText,
  EnvelopeSimple,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";

const quickLinks = [
  { href: "/jobs", label: "Opportunities", icon: Briefcase },
  { href: "/notes", label: "Study Notes", icon: BookOpen },
  { href: "/tests", label: "Practice Tests", icon: ClipboardText },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* ── Main Footer ─────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 md:py-24">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white text-sm font-bold">
                OD
              </span>
              <span className="text-lg font-semibold text-white tracking-tight">
                Opportunity Desk
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-[42ch] text-zinc-500">
              Your central platform to discover opportunities, access study
              materials, and prepare for competitive exams across Pakistan and
              beyond.
            </p>
            <div className="flex flex-col gap-2 mt-6 text-sm">
              <span className="flex items-center gap-2">
                <EnvelopeSimple size={16} weight="regular" />
                contact@opportunitydesk.pk
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} weight="regular" />
                Islamabad, Pakistan
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-white transition-all duration-300"
                    >
                      <Icon size={16} weight="regular" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 mb-5">
              Resources
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/admin/login"
                  className="text-sm text-zinc-400 hover:text-white transition-all duration-300"
                >
                  Admin Panel
                </Link>
              </li>
              <li>
                <span className="text-sm text-zinc-500">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-zinc-500">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ──────────────────────── */}
        <div className="border-t border-zinc-800/60 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            2026 Opportunity Desk. All rights reserved.
          </p>
          <p className="text-xs text-zinc-700">
            Built for students, by students.
          </p>
        </div>
      </div>
    </footer>
  );
}
