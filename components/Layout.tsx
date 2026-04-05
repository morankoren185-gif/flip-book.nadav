import type { ReactNode } from "react";
import type { PageLayout } from "@/types/book";
import { StoryOnArt } from "@/components/StoryOnArt";

type LayoutProps = {
  variant: PageLayout;
  mode?: "default" | "finale";
  measure?: "single" | "spread";
  className?: string;
  children: ReactNode;
};

/**
 * Picture-book zones: corners / bands — text sits ON the art via StoryOnArt (no panels).
 * `center` = lower literary band, right-weighted (not website-centered).
 */
const variantClass: Record<PageLayout, string> = {
  "top-right":
    "top-[4%] end-[3.5%] items-start justify-end max-w-[min(46%,17rem)] sm:max-w-[min(42%,18rem)]",
  "top-left":
    "top-[4%] start-[3.5%] items-start justify-start max-w-[min(46%,17rem)] sm:max-w-[min(42%,18rem)]",
  "bottom-right":
    "bottom-[4.5%] end-[3.5%] items-end justify-end max-w-[min(46%,17rem)] sm:max-w-[min(42%,18rem)]",
  "bottom-left":
    "bottom-[4.5%] start-[3.5%] items-end justify-start max-w-[min(46%,17rem)] sm:max-w-[min(42%,18rem)]",
  center:
    "bottom-[4%] start-[5%] end-[5%] top-auto max-w-none flex flex-col items-center justify-end"
};

export function Layout({
  variant,
  mode = "default",
  measure = "single",
  className = "",
  children
}: LayoutProps) {
  const isCenter = variant === "center";

  return (
    <div
      className={`absolute z-10 flex flex-col ${variantClass[variant]} ${className}`.trim()}
    >
      <StoryOnArt
        mode={mode}
        measure={measure}
        textAlign={isCenter ? "center" : "right"}
      >
        {children}
      </StoryOnArt>
    </div>
  );
}
