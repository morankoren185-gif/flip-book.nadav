"use client";

import { bookData } from "@/data/bookData";
import { renderBookPage } from "@/components/templates/registry";
import type { BookPage } from "@/types/book";

/**
 * Stack the same output as BookViewer inner leaves (renderBookPage), without
 * PageFlip / FlipPage / mirror / scale — isolates integration vs components+CSS.
 */
export default function DebugViewerPage() {
  return (
    <main dir="rtl" lang="he" style={{ padding: "16px 12px 48px", background: "#ebe4d7" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 20, marginBottom: 8 }}>debug-viewer</h1>
        <p style={{ fontSize: 14, color: "#333", marginBottom: 20, lineHeight: 1.5 }}>
          אותו <code>renderBookPage(page)</code> כמו ב־BookViewer (תבניות + נפילה ל־PageCover /
          PageSingle / PageSpread / PageBackCover). ללא react-pageflip, FlipPage, mirror או
          אנימציה.
        </p>

        {bookData.map((page, i) => (
          <div
            key={`${page.type}-${String(page.id)}-${i}`}
            style={{
              border: "3px solid #222",
              borderRadius: 8,
              marginBottom: 28,
              padding: 12,
              background: "#fffef8"
            }}
          >
            <div
              style={{
                fontSize: 12,
                marginBottom: 12,
                fontFamily: "ui-monospace, monospace",
                wordBreak: "break-all",
                color: "#444"
              }}
            >
              #{i} · id: {String(page.id)} · type: {page.type} · template:{" "}
              <strong>{page.template}</strong>
            </div>
            <div>{renderBookPage(page as BookPage)}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
