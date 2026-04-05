import type { ReactNode } from "react";

type StoryOnArtProps = {
  children: ReactNode;
  mode?: "default" | "finale";
  measure?: "single" | "spread";
  textAlign?: "right" | "center";
  className?: string;
};

/**
 * Story text painted onto the art — no cards. Soft radial wash + delicate shadow only.
 */
export function StoryOnArt({
  children,
  mode = "default",
  measure = "single",
  textAlign = "right",
  className = ""
}: StoryOnArtProps) {
  const isFinale = mode === "finale";

  const maxMeasure =
    textAlign === "center"
      ? "max-w-[min(22rem,89vw)] w-full"
      : measure === "spread"
        ? "max-w-[min(14.5rem,38vw)] sm:max-w-[min(16rem,34%)]"
        : "max-w-[min(17rem,46vw)] sm:max-w-[min(18.5rem,42%)] md:max-w-[min(19rem,40%)]";

  const washStyle =
    isFinale
      ? {
          background:
            "radial-gradient(ellipse 100% 85% at 65% 50%, rgba(255,252,247,0.48) 0%, rgba(255,250,244,0.12) 52%, transparent 74%)"
        }
      : {
          background:
            "radial-gradient(ellipse 100% 88% at 68% 48%, rgba(255,253,249,0.34) 0%, rgba(255,251,246,0.08) 48%, transparent 70%)"
        };

  return (
    <div
      className={`story-on-art-root relative ${maxMeasure} ${className}`.trim()}
      dir="rtl"
      lang="he"
    >
      <div
        className="pointer-events-none absolute -start-[22%] -end-[14%] -top-[26%] -bottom-[20%] z-0 opacity-100 max-md:-start-[16%] max-md:-end-[10%]"
        style={washStyle}
        aria-hidden
      />
      <div
        className={`story-on-art-text relative z-[1] whitespace-pre-wrap ${textAlign === "center" ? "text-center" : "text-right"} ${isFinale ? "story-on-art-text--finale" : ""}`.trim()}
      >
        {children}
      </div>
    </div>
  );
}
