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
        className="object-cover"
        style={{ objectPosition: "50% 42%" }}
        sizes="500px"
        priority
      />

      {/* Title — top */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
          padding: "0 8%"
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily:
              "var(--font-secular-one), 'Secular One', 'Frank Ruhl Libre', serif",
            fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)",
            fontWeight: 400,
            color: "#1a1410",
            direction: "rtl",
            textShadow: TITLE_SHADOW,
            lineHeight: 1.25
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
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
          padding: "0 8%"
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
            direction: "rtl",
            textShadow: TITLE_SHADOW,
            lineHeight: 1.5
          }}
        >
          {page.subtitle}
        </p>
      </div>

      {/* Author — bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "6%",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 10,
          padding: "0 8%"
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
            direction: "rtl",
            textShadow: TITLE_SHADOW
          }}
        >
          {page.author}
        </p>
      </div>
    </CoverFrame>
  );
}
