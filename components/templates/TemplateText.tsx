import type { CSSProperties, ReactNode } from "react";

type TemplateTextProps = {
  children: ReactNode;
  color?: string;
  align?: "right" | "left" | "center";
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
};

export function TemplateText({
  children,
  color = "#1a1410",
  align = "right",
  size = "md",
  style
}: TemplateTextProps) {
  const fontSize =
    size === "sm"
      ? "clamp(0.82rem, 1.3vw, 0.95rem)"
      : size === "lg"
        ? "clamp(1rem, 1.8vw, 1.25rem)"
        : "clamp(0.9rem, 1.5vw, 1.08rem)";

  return (
    <p
      lang="he"
      style={{
        margin: 0,
        padding: 0,
        fontFamily:
          "var(--font-frank-ruhl), var(--font-secular-one), 'Frank Ruhl Libre', 'Secular One', 'David Libre', serif",
        fontSize,
        fontWeight: 600,
        lineHeight: 2.1,
        letterSpacing: "0.02em",
        color,
        direction: "rtl",
        textAlign: align,
        whiteSpace: "pre-line",
        textShadow: `
          0 0 1.2em rgba(255,253,248,0.92),
          0 0 0.5em rgba(255,255,253,0.95),
          0 0 0.2em rgba(255,255,255,1),
          0 1px 4px rgba(255,255,255,0.4),
          0 0 22px rgba(255,252,246,0.45)
        `,
        ...style
      }}
    >
      {children}
    </p>
  );
}
