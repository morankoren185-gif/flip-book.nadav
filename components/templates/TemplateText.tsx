import type { ReactNode } from "react";

type TemplateTextProps = {
  children: ReactNode;
  /** Slightly larger closing page */
  finale?: boolean;
  className?: string;
};

/** Typography for art-directed pages (printed on illustration). */
export function TemplateText({
  children,
  finale = false,
  className = ""
}: TemplateTextProps) {
  return (
    <p
      className={`story-on-art-text m-0 whitespace-pre-wrap ${finale ? "story-on-art-text--finale" : ""} ${className}`.trim()}
      dir="rtl"
      lang="he"
    >
      {children}
    </p>
  );
}
