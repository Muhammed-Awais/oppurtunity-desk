import { cn } from "@/lib/cn";

interface Props {
  className?: string;
  variant?: "card" | "text" | "image";
}

export default function SkeletonCard({
  className,
  variant = "card",
}: Props) {
  if (variant === "text") {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
      </div>
    );
  }

  if (variant === "image") {
    return <div className={cn("skeleton aspect-[16/10] w-full rounded-2xl", className)} />;
  }

  return (
    <div className={cn("card-shell", className)}>
      <div className="card-core p-6 md:p-8 space-y-4">
        <div className="skeleton h-40 w-full rounded-xl" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-4/5" />
        <div className="flex gap-2 pt-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
