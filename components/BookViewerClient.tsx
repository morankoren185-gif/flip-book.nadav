"use client";

import dynamic from "next/dynamic";

/**
 * Client-only wrapper for BookViewer.
 *
 * `dynamic(..., { ssr: false })` must be called inside a Client Component —
 * Server Components cannot use it because the feature relies on React context
 * that only exists on the client.  This thin wrapper carries the "use client"
 * directive so the dynamic call is always evaluated in a client context.
 *
 * BookViewer (and BookFlipBook inside it) reads window.innerWidth, uses
 * ResizeObserver, and produces viewport-dependent CSS transforms.  The server
 * cannot produce the same HTML the client would, so skipping SSR entirely is
 * the correct approach.
 */
const BookViewerDynamic = dynamic(
  () => import("@/components/BookViewer").then((m) => m.BookViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center gap-4" aria-hidden="true">
        {/* Size matches the single-page book footprint (500 × 700) so the
            page layout does not reflow when the real component mounts. */}
        <div
          style={{ width: 500, height: 700, maxWidth: "100%" }}
          className="animate-pulse rounded-[10px] bg-[#e4ddd2]/60"
        />
        <div className="h-8 w-48 animate-pulse rounded bg-[#e4ddd2]/60" />
      </div>
    )
  }
);

export function BookViewerClient() {
  return <BookViewerDynamic />;
}
