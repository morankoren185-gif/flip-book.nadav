import type { BookPageCover } from "@/types/book";
import { CoverFrame } from "@/components/templates/shells";
import { BookImage } from "@/components/BookImage";

export function CoverTemplate({ page }: { page: BookPageCover }) {
  return (
    <CoverFrame>
      <BookImage
        src={page.image}
        alt={page.title}
        fill
        style={{ objectFit: "contain", objectPosition: "50% 58%" }}
        sizes="500px"
        priority
      />

      {/* Title — top area, large display Hebrew font */}
      <div
        style={{
          position: "absolute",
          top: "6%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "88%",
          textAlign: "center",
          direction: "rtl",
          zIndex: 10
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily:
              "var(--font-secular), 'Secular One', var(--font-frank-ruhl), 'Frank Ruhl Libre', serif",
            fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#1a1410",
            letterSpacing: "0.01em",
            textShadow: `
            0 0 1.5em rgba(255,253,248,0.98),
            0 0 0.6em rgba(255,255,253,1),
            0 2px 8px rgba(255,255,255,0.6)
          `
          }}
        >
          {page.title}
        </h1>
        <p
          style={{
            margin: "10px 0 0",
            fontFamily:
              "var(--font-frank-ruhl), 'Frank Ruhl Libre', serif",
            fontSize: "clamp(0.82rem, 1.6vw, 1rem)",
            fontWeight: 400,
            color: "#3a3028",
            lineHeight: 1.5,
            textShadow: "0 0 1em rgba(255,253,248,0.95)"
          }}
        >
          {page.subtitle}
        </p>
      </div>

      {/* Author — bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          textAlign: "center",
          direction: "rtl",
          zIndex: 10
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily:
              "var(--font-frank-ruhl), 'Frank Ruhl Libre', serif",
            fontSize: "clamp(0.7rem, 1.3vw, 0.85rem)",
            color: "#5a5048",
            opacity: 0.85,
            textShadow: "0 0 0.8em rgba(255,253,248,0.9)"
          }}
        >
          {page.author}
        </p>
      </div>
    </CoverFrame>
  );
}
