import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  size?: "sm" | "md";
  showWordmark?: boolean;
}

/** Brand mark: gradient chip + serif IA / iAffirm wordmark */
export function Logo({
  href = "/",
  className,
  size = "md",
  showWordmark = true,
}: LogoProps) {
  const mark = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative inline-flex items-center justify-center rounded-lg font-medium leading-none select-none tracking-wide text-[#1a1a1a]",
          size === "sm" ? "w-7 h-7 text-[9px]" : "w-8 h-8 text-[10px]"
        )}
        style={{
          background: "linear-gradient(110deg, #9fd4d0 0%, #c5dfb0 50%, #e4eb9a 100%)",
        }}
        aria-hidden
      >
        <span className="block translate-y-[0.04em]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          IA
        </span>
      </span>
      {showWordmark && (
        <span
          className={cn(
            "font-medium tracking-[0.18em] text-[#1a1a1a] uppercase",
            size === "sm" ? "text-[11px]" : "text-[13px]"
          )}
          style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
        >
          I Affirm
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
