"use client";

import { useCallback, useState } from "react";
import { bookData } from "@/data/bookData";

type UnknownPage = (typeof bookData)[number];

function DebugImg({ src, label }: { src: string; label?: string }) {
  const [failed, setFailed] = useState(false);

  const onLoad = useCallback(() => {
    console.log("[debug-book] image load OK:", src);
  }, [src]);

  const onError = useCallback(() => {
    console.error("[debug-book] image load FAIL:", src);
    setFailed(true);
  }, [src]);

  return (
    <div style={{ marginTop: 8 }}>
      {label ? (
        <div style={{ fontSize: 12, color: "#444", marginBottom: 4 }}>{label}</div>
      ) : null}
      {failed ? (
        <div
          style={{
            color: "red",
            border: "2px solid red",
            padding: 12,
            background: "#fff0f0",
            fontFamily: "monospace",
            fontSize: 13
          }}
        >
          Image failed to load: <code>{src}</code>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- debug route: plain &lt;img&gt; only
        <img
          src={src}
          alt=""
          onLoad={onLoad}
          onError={onError}
          style={{ maxWidth: "min(420px, 100%)", height: "auto", display: "block" }}
        />
      )}
    </div>
  );
}

function textBlocksForPage(page: UnknownPage): string[] {
  const blocks: string[] = [];
  const p = page as Record<string, unknown>;

  if (typeof p.text === "string") blocks.push(p.text);
  if (typeof p.title === "string") blocks.push(`title: ${p.title}`);
  if (typeof p.subtitle === "string") blocks.push(`subtitle: ${p.subtitle}`);
  if (typeof p.author === "string") blocks.push(`author: ${p.author}`);
  if (typeof p.rightText === "string") blocks.push(`rightText:\n${p.rightText}`);
  if (typeof p.leftText === "string") blocks.push(`leftText:\n${p.leftText}`);

  return blocks;
}

export default function DebugBookPage() {
  const slice = bookData.slice(0, 5);

  return (
    <main
      dir="rtl"
      lang="he"
      style={{
        padding: 24,
        maxWidth: 720,
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
        background: "#f5f5f5",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ fontSize: 20, marginBottom: 8 }}>debug-book</h1>
      <p style={{ marginBottom: 24, color: "#333", fontSize: 14 }}>
        רינדור גולמי ללא PageFlip / תבניות / next/image — 5 ראשונים מ־bookData.
      </p>

      {slice.map((page, i) => {
        const p = page as Record<string, unknown>;
        const image = typeof p.image === "string" ? p.image : undefined;
        const rightImage = typeof p.rightImage === "string" ? p.rightImage : undefined;
        const leftImage = typeof p.leftImage === "string" ? p.leftImage : undefined;
        const texts = textBlocksForPage(page);

        return (
          <div
            key={`${String(p.id)}-${i}`}
            style={{
              border: "3px solid #333",
              borderRadius: 8,
              padding: 16,
              marginBottom: 24,
              background: "#fff"
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8 }}>
              #{i + 1} — id: <code>{String(p.id)}</code> · type:{" "}
              <code>{String(p.type)}</code>
            </div>

            {image ? (
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 13, wordBreak: "break-all" }}>
                  <strong>image path:</strong> <code>{image}</code>
                </div>
                <DebugImg src={image} />
              </div>
            ) : null}

            {rightImage ? (
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 13, wordBreak: "break-all" }}>
                  <strong>rightImage path:</strong> <code>{rightImage}</code>
                </div>
                <DebugImg src={rightImage} label="rightImage" />
              </div>
            ) : null}

            {leftImage ? (
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 13, wordBreak: "break-all" }}>
                  <strong>leftImage path:</strong> <code>{leftImage}</code>
                </div>
                <DebugImg src={leftImage} label="leftImage" />
              </div>
            ) : null}

            {!image && !rightImage && !leftImage ? (
              <div style={{ color: "#c00", marginBottom: 8 }}>אין שדה תמונה בערך זה</div>
            ) : null}

            <div style={{ marginTop: 12 }}>
              <strong style={{ display: "block", marginBottom: 6 }}>טקסט (אם קיים):</strong>
              {texts.length === 0 ? (
                <span style={{ color: "#666" }}>—</span>
              ) : (
                texts.map((t, j) => (
                  <pre
                    key={j}
                    style={{
                      whiteSpace: "pre-wrap",
                      margin: "0 0 12px",
                      padding: 10,
                      background: "#f9f9f9",
                      border: "1px solid #ddd",
                      fontSize: 13,
                      lineHeight: 1.45
                    }}
                  >
                    {t}
                  </pre>
                ))
              )}
            </div>
          </div>
        );
      })}
    </main>
  );
}
