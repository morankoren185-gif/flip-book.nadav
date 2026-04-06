import type { BookPageCover } from "@/types/book";
import { CoverFrame } from "@/components/templates/shells";
import { BookImage } from "@/components/BookImage";

/** ~2× stronger luminous halo than `TemplateText` for cover legibility */
const COVER_HALO =
  "0 0 2.4em rgba(255,253,248,0.98), 0 0 1em rgba(255,255,253,0.98), 0 0 0.45em rgba(255,255,255,1), 0 2px 8px rgba(255,255,255,0.65), 0 0 44px rgba(255,252,246,0.75)";

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

      <div
        style={{
          position: "absolute",
          bottom: "22%",
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
              "var(--font-frank-ruhl), 'Frank Ruhl Libre', 'Secular One', 'David Libre', serif",
            fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
            fontWeight: 700,
            color: "#1a1410",
            direction: "rtl",
            textShadow: COVER_HALO,
            lineHeight: 1.25
          }}
        >
          {page.title}
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "13%",
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
              "var(--font-frank-ruhl), 'Frank Ruhl Libre', 'Secular One', 'David Libre', serif",
            fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)",
            fontWeight: 500,
            color: "#1a1410",
            direction: "rtl",
            textShadow: COVER_HALO,
            lineHeight: 1.5
          }}
        >
          {page.subtitle}
        </p>
      </div>

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
              "var(--font-frank-ruhl), 'Frank Ruhl Libre', 'Secular One', 'David Libre', serif",
            fontSize: "clamp(0.76rem, 1.2vw, 0.9rem)",
            fontWeight: 500,
            color: "#1a1410",
            opacity: 0.8,
            direction: "rtl",
            textShadow: COVER_HALO
          }}
        >
          {page.author}
        </p>
      </div>
    </CoverFrame>
  );
}
