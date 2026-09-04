import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  size?: "sm" | "md";
  showWordmark?: boolean;
}

/** Simple wordmark: soft leaf mark + bold type */
export function Logo({
  href = "/",
  className,
  size = "md",
  showWordmark = true,
}: LogoProps) {
  const mark = (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "relative flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold leading-none select-none",
          size === "sm" ? "w-7 h-7 text-[11px]" : "w-8 h-8 text-xs"
        )}
        aria-hidden
      >
        iA
      </span>
      {showWordmark && (
        <span
          className={cn(
            "font-bold tracking-tight text-foreground",
            size === "sm" ? "text-[15px]" : "text-lg"
          )}
        >
          iAffirm
        </span>
      )}
    </span>
  );

  if (!href) return mark;
  return (
    <Link href={href} className="inline-flex items-center hover:opacity-90 transition-opacity">
      {mark}
    </Link>
  );
}
