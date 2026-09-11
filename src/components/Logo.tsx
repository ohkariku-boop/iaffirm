import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  size?: "sm" | "md";
  /** Kept for API compat; wordmark is always the full I AFFIRM */
  showWordmark?: boolean;
}

/** Full I AFFIRM wordmark — gradient chip optional on larger sizes */
export function Logo({
  href = "/",
  className,
  size = "md",
  showWordmark = true,
}: LogoProps) {
  const mark = (
    <span className={cn("inline-flex items-center gap-2", className)}>
      {size === "md" && (
        <span
          className="relative hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-lg leading-none select-none text-[#1a1a1a] text-[8px] tracking-[0.14em] font-medium"
          style={{
            background: "linear-gradient(110deg, #9fd4d0 0%, #c5dfb0 50%, #e4eb9a 100%)",
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
          }}
          aria-hidden
        >
          <span className="block translate-y-[0.04em] px-0.5 text-center leading-tight">
            I
            <br />
            A
          </span>
        </span>
      )}
      <span
        className={cn(
          "font-medium tracking-[0.22em] text-[#1a1a1a] uppercase whitespace-nowrap",
          size === "sm" ? "text-[11px] sm:text-[12px]" : "text-[13px] sm:text-[14px]"
        )}
        style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
      >
        I Affirm
      </span>
    </span>
  );

  if (!href) return mark;
  return (
    <Link href={href} className="inline-flex items-center hover:opacity-90 transition-opacity">
      {mark}
    </Link>
  );
}
