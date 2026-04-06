import type { BookPageCover } from "@/types/book";
import { CoverFrame } from "@/components/templates/shells";
import { BookImage } from "@/components/BookImage";

const TITLE_SHADOW =
  "0 0 1.5em rgba(255,255,255,0.95), 0 0 0.6em rgba(255,255,255,1), 0 2px 6px rgba(255,255,255,0.7)";

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

      {/* Title — top */}
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
              "var(--font-secular-one), 'Secular One', var(--font-frank-ruhl), 'Frank Ruhl Libre', serif",
            fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#1a1410",
            letterSpacing: "0.01em",
            textShadow: TITLE_SHADOW
          }}
        >
          {page.title}
        </h1>
      </div>

      {/* Subtitle — middle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: "50%",
          marginLeft: "-44%",
          width: "88%",
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
            fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)",
            fontWeight: 500,
            color: "#1a1410",
            lineHeight: 1.5,
            textShadow: TITLE_SHADOW
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
            fontSize: "clamp(0.76rem, 1.2vw, 0.9rem)",
            fontWeight: 500,
            color: "#1a1410",
            opacity: 0.8,
            textShadow: TITLE_SHADOW
          }}
        >
          {page.author}
        </p>
      </div>
    </CoverFrame>
  );
}
