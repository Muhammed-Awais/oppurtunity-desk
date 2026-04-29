import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  children,
  className,
  align = "left",
}: Props) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center flex flex-col items-center",
        className
      )}
    >
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-none mt-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-zinc-500 leading-relaxed max-w-[55ch] mt-4">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
