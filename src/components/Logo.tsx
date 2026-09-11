import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  href?: string;
  className?: string;
  size?: "sm" | "md";
  showWordmark?: boolean;
}

/** AFFIRM mark — tall center I, matching brand artwork */
export function Logo({
  href = "/",
  className,
  size = "md",
}: LogoProps) {
  const serif = { fontFamily: "Georgia, 'Times New Roman', Times, serif" } as const;

  const mark = (
    <span
      className={cn(
        "inline-flex items-baseline justify-center select-none text-[#1a1a1a]",
        className
      )}
      style={serif}
      aria-label="I Affirm"
    >
      <span
        className={cn(
          "font-semibold tracking-[0.06em]",
          size === "sm" ? "text-[13px]" : "text-[15px]"
        )}
      >
        AFF
      </span>
      <span
        className={cn(
          "font-semibold leading-none mx-[0.02em]",
          size === "sm" ? "text-[22px]" : "text-[26px]"
        )}
        style={{ ...serif, transform: "translateY(0.06em)" }}
      >
        I
      </span>
      <span
        className={cn(
          "font-semibold tracking-[0.06em]",
          size === "sm" ? "text-[13px]" : "text-[15px]"
        )}
      >
        RM
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
