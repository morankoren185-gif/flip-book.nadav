"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties
} from "react";
import type { BookPage } from "@/types/book";
import { bookData } from "@/data/bookData";
import { renderBookPage } from "@/components/templates/registry";
import {
  FLIP_PAGE_HEIGHT_PX,
  FLIP_PAGE_WIDTH_PX,
  SPREAD_PAGE_WIDTH_PX,
  PageFrame,
  SpreadPageFrame
} from "@/components/PageFrame";

/** Animation duration (ms) — lift / cross / settle */
const FLIP_MS = 1150;

/**
 * Vertical space (px) reserved for navigation + padding below the book.
 * Used when computing scale-by-height so the book never overflows vertically.
 */
const NAV_RESERVE_PX = 210;

/**
 * Return the natural display width for a given bookData entry.
 * Spreads are 1000 px wide; everything else is 500 px.
 */
function entryWidth(idx: number): number {
  const e = bookData[idx];
  if (!e) return FLIP_PAGE_WIDTH_PX;
  // cover and back-cover = 500 px (closed book appearance)
  // every other entry = 1000 px (open book: blank right + illustrated left)
  if (e.type === "cover" || e.type === "back-cover") return FLIP_PAGE_WIDTH_PX;
  return SPREAD_PAGE_WIDTH_PX;
}

const MAIN_ANIM_NEXT = "rtlFlipSheetYNext";
const MAIN_ANIM_PREV = "rtlFlipSheetYPrev";

/** Debug label overlay — only when ?turnDebug=1 in dev */
const TURN_DEBUG =
  process.env.NODE_ENV === "development" &&
  typeof window !== "undefined" &&
  window.location.search.includes("turnDebug=1");

export type BookFlipBookHandle = {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    flip: (pageIndex: number) => void;
  };
};

type BookFlipBookProps = {
  onFlipIndex?: (index: number) => void;
  onEdgeStoryNext?: () => void;
  onEdgeStoryPrev?: () => void;
};

function pageKey(page: BookPage) {
  return `${page.type}-${String(page.id)}`;
}

export const BookFlipBook = forwardRef<BookFlipBookHandle, BookFlipBookProps>(
  function BookFlipBook(
    { onFlipIndex, onEdgeStoryNext, onEdgeStoryPrev },
    forwardedRef
  ) {
    const lastIndex = bookData.length - 1;
    const [displayIndex, setDisplayIndex] = useState(0);
    const [phase, setPhase] = useState<null | "next" | "prev">(null);
    const [viewWidth, setViewWidth] = useState<number>(() => entryWidth(0));

    const busyRef = useRef(false);
    const phaseRef = useRef<null | "next" | "prev">(null);
    const endHandledRef = useRef(false);

    /**
     * Keep phaseRef and displayIndexRef in sync on every render.
     * Setting these inline (not via useEffect) means they are current before
     * any asynchronous browser event (AnimationEnd) can read them.
     */
    phaseRef.current = phase;
    const displayIndexRef = useRef(displayIndex);
    displayIndexRef.current = displayIndex;

    // ── Responsive scale ────────────────────────────────────────────────
    /**
     * outerRef measures the available container width.
     * availW / availH are updated by a ResizeObserver that has NO dependency
     * on viewWidth, so scale is derived synchronously in the same render as
     * viewWidth changes — eliminating the async lag that caused the presenter
     * to momentarily display at mismatched dimensions.
     */
    const outerRef = useRef<HTMLDivElement>(null);
    /**
     * Initialize availW from window.innerWidth so the very first render already
     * has a reasonable scale value. The ResizeObserver will later correct this to
     * the precise container clientWidth. Initialising to 0 would give scale=1 on
     * the first render, momentarily showing a 1000-px spread at full size on
     * narrow screens before the effect fires.
     */
    const [availW, setAvailW] = useState(0);
    const [measured, setMeasured] = useState(false);
    const [availH, setAvailH] = useState(() =>
      typeof window !== "undefined" ? window.innerHeight - NAV_RESERVE_PX : 700
    );

    useEffect(() => {
      const measure = () => {
        const el = outerRef.current;
        if (!el) return;
        setAvailW(el.clientWidth);
        setAvailH(window.innerHeight - NAV_RESERVE_PX);
        setMeasured(true);
      };

      measure();

      const ro = new ResizeObserver(measure);
      const el = outerRef.current;
      if (el) ro.observe(el);
      window.addEventListener("resize", measure);
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", measure);
      };
    }, []); // no viewWidth dependency — scale is a derived value below

    /**
     * scale is computed directly from the measured container and the current
     * logical book width.  Because it is NOT state it updates in the same
     * React render as viewWidth, preventing any intermediate frame where the
     * presenter dimensions and the shell dimensions are inconsistent.
     */
    const scale =
      availW > 0
        ? Math.min(1, availW / viewWidth, availH / FLIP_PAGE_HEIGHT_PX)
        : 1;
    // ────────────────────────────────────────────────────────────────────

    /**
     * Natural-size pages.
     * cover / back-cover → PageFrame (500 px, closed book)
     * everything else    → SpreadPageFrame (1000 px, open book)
     */
    const pagesNatural = useMemo(
      () =>
        bookData.map((page) => {
          const p = page as BookPage;
          const Frame =
            p.type === "cover" || p.type === "back-cover"
              ? PageFrame
              : SpreadPageFrame;
          return <Frame key={pageKey(p)}>{renderBookPage(p)}</Frame>;
        }),
      []
    );

    /**
     * Leaf pages for the turning face.
     * Same frame logic as pagesNatural: 1000 px for all story entries so
     * the overflow-hidden + flex-end crop in turning-sheet__front exposes
     * the correct illustrated right half during a next-flip.
     */
    const pagesLeaf = useMemo(
      () =>
        bookData.map((page) => {
          const p = page as BookPage;
          const Frame =
            p.type === "cover" || p.type === "back-cover"
              ? PageFrame
              : SpreadPageFrame;
          return <Frame key={pageKey(p)}>{renderBookPage(p)}</Frame>;
        }),
      []
    );

    useEffect(() => {
      onFlipIndex?.(displayIndex);
    }, [displayIndex, onFlipIndex]);

    /**
     * finishFlip — called by onAnimationEnd when the page-turn CSS animation
     * completes.
     *
     * All three state updates (displayIndex, viewWidth, phase) are called as
     * plain siblings in the same callback.  React 18 batches them into one
     * commit so there is no intermediate frame.
     *
     * IMPORTANT: we use displayIndexRef.current instead of the functional
     * updater form for setDisplayIndex, which eliminates the React anti-pattern
     * of calling setState inside another setState updater.  The updater form
     * would schedule setViewWidth as a SEPARATE render (two commits = flash).
     */
    const finishFlip = useCallback(() => {
      const p = phaseRef.current;
      const cur = displayIndexRef.current;

      let newIdx = cur;
      if (p === "next") newIdx = Math.min(lastIndex, cur + 1);
      else if (p === "prev") newIdx = Math.max(0, cur - 1);

      setDisplayIndex(newIdx);
      setViewWidth(entryWidth(newIdx));
      setPhase(null);
      busyRef.current = false;
    }, [lastIndex]);

    /**
     * beginFlip — the ONLY state change here is setPhase(dir).
     *
     * ── Outer footprint lock ──────────────────────────────────────────────
     * viewWidth, scale, scaledW, and therefore book-scale-presenter dimensions
     * are ALL derived from viewWidth.  Any change to viewWidth during the visible
     * animation shifts the outer book footprint — that is the jitter.
     *
     * The fix: viewWidth is NEVER touched in beginFlip.  The flip always runs
     * in the pre-flip viewport.  All layout state (displayIndex, viewWidth,
     * phase→null) is committed atomically in finishFlip, AFTER the animation
     * is visually complete.  With no CSS width transitions on the shell or
     * viewport (see globals.css), the post-flip commit is a single-frame snap
     * at the natural "animation end" cut point — imperceptible as jitter.
     * ─────────────────────────────────────────────────────────────────────
     */
    const beginFlip = useCallback(
      (dir: "next" | "prev") => {
        if (busyRef.current) return;
        if (dir === "next" && displayIndex >= lastIndex) return;
        if (dir === "prev" && displayIndex <= 0) return;

        busyRef.current = true;
        endHandledRef.current = false;

        // *** viewWidth is intentionally NOT changed here ***
        setPhase(dir);
      },
      [displayIndex, lastIndex]
    );

    const beginNext = useCallback(() => beginFlip("next"), [beginFlip]);
    const beginPrev = useCallback(() => beginFlip("prev"), [beginFlip]);

    const jumpTo = useCallback(
      (i: number) => {
        if (busyRef.current) return;
        const clamped = Math.max(0, Math.min(lastIndex, i));
        setDisplayIndex(clamped);
        setViewWidth(entryWidth(clamped));
      },
      [lastIndex]
    );

    useImperativeHandle(
      forwardedRef,
      () => ({
        pageFlip: () => ({
          flipNext: beginNext,
          flipPrev: beginPrev,
          flip: jumpTo
        })
      }),
      [beginNext, beginPrev, jumpTo]
    );

    const onMainFlipAnimationEnd = useCallback(
      (e: AnimationEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return;
        if (phaseRef.current === null) return;
        if (endHandledRef.current) return;
        const name = e.animationName;
        if (name !== MAIN_ANIM_NEXT && name !== MAIN_ANIM_PREV) return;
        endHandledRef.current = true;
        finishFlip();
      },
      [finishFlip]
    );

    const h = FLIP_PAGE_HEIGHT_PX;

    // ── Derived scale values ─────────────────────────────────────────────
    const scaledW = Math.round(viewWidth * scale);
    const scaledH = Math.round(h * scale);

    /**
     * Shell style — no CSS width transition (removed from globals.css).
     * The shell width only changes in finishFlip (post-animation), never
     * during the visible flip, so no transition is needed or wanted.
     */
    const shellStyle: CSSProperties = {
      position: "absolute",
      top: 0,
      left: 0,
      width: viewWidth,
      ...(scale < 1
        ? { transform: `scale(${scale})`, transformOrigin: "top left" }
        : {})
    };
    // ────────────────────────────────────────────────────────────────────

    // Under-page: the destination page, revealed as the turning leaf lifts away
    const underChild =
      phase === "next"
        ? pagesNatural[displayIndex + 1] ?? null
        : phase === "prev"
          ? pagesNatural[displayIndex - 1] ?? null
          : null;

    /**
     * Show the spine crease exactly when the viewport is in spread mode
     * (logical width = 1000 px).  This is true:
     *  - while statically showing a spread page
     *  - during any flip where the viewport is (or was just) 1000 px wide
     *    (single→spread: viewport expands at flip start; spread→single:
     *     viewport stays wide until finishFlip)
     */
    const showSpine = viewWidth >= SPREAD_PAGE_WIDTH_PX;

    /**
     * Perspective origin shifts to sell the 3-D lift from the correct corner.
     */
    const perspOrigin =
      phase === "prev"
        ? "34% 43%"
        : phase === "next"
          ? "66% 43%"
          : "50% 46%";

    const debugLabel = TURN_DEBUG
      ? phase === "next"
        ? `next | leaf=${displayIndex} | under=${displayIndex + 1} | vw=${viewWidth} | scale=${scale.toFixed(2)}`
        : phase === "prev"
          ? `prev | leaf=${displayIndex} | under=${displayIndex - 1} | vw=${viewWidth} | scale=${scale.toFixed(2)}`
          : `static | idx=${displayIndex} | vw=${viewWidth} | scale=${scale.toFixed(2)} | type=${bookData[displayIndex]?.type}`
      : "";

    if (!measured) {
      return (
        <div ref={outerRef} className="book-scale-outer w-full self-stretch">
          <div
            style={{
              width: "100%",
              height: FLIP_PAGE_HEIGHT_PX,
              opacity: 0
            }}
          />
        </div>
      );
    }

    return (
      /*
       * ── Layout: three-layer responsive structure ──────────────────────
       *
       * 1. book-scale-outer     — full-width measurement wrapper (no visual role)
       * 2. book-scale-presenter — sized to the VISUAL (scaled) book footprint,
       *    centred via margin:auto. Takes correct space in document flow.
       * 3. book-flip-shell      — full logical size (500/1000 × 700 px),
       *    absolutely positioned inside the presenter and optionally scaled
       *    down via transform:scale so all internal px math stays correct.
       *
       * Pointer events, edge zones, and 3-D flip layers all live inside
       * book-flip-shell and scale together — no coordinate remapping needed.
       * ─────────────────────────────────────────────────────────────────
       */
      <div ref={outerRef} className="book-scale-outer w-full self-stretch">
        <div
          className="book-scale-presenter"
          style={{ width: scaledW, height: scaledH }}
        >
          <div className="book-flip-shell" style={shellStyle}>
            <div
              className={`rtl-book-viewport relative overflow-hidden${phase ? " rtl-book-viewport--flipping" : ""}`}
              lang="he"
              data-turn={phase ?? undefined}
              style={
                {
                  width: viewWidth,
                  height: h,
                  perspective: 1800,
                  perspectiveOrigin: perspOrigin,
                  ["--rtl-flip-ms" as string]: `${FLIP_MS}ms`
                } as CSSProperties
              }
            >
              {/* Spine crease — only when spread viewport is active */}
              {showSpine ? (
                <div
                  className={`rtl-book-spine-line pointer-events-none absolute inset-y-0 z-[2] w-[18px]${phase ? " rtl-book-spine-line--flipping" : ""}`}
                  style={{ left: viewWidth / 2 - 9 }}
                  aria-hidden
                />
              ) : null}

              {phase === null ? (
                /* ── Static display ────────────────────────────────────── */
                <div className="rtl-book-page-static absolute inset-0 z-0">
                  {pagesNatural[displayIndex]}
                </div>
              ) : (
                /* ── Flip in progress ──────────────────────────────────── */
                <>
                  {/*
                   * BACKGROUND LAYER: current page rendered behind everything.
                   *
                   * Why this matters for spread→single transitions:
                   * The viewport stays at 1000 px while the spread's right half
                   * turns over. Without this layer the left half of the spread
                   * disappears the moment the flip begins (the static display
                   * is replaced by the flip layer stack). This layer keeps the
                   * full spread visible so the left page continues to show
                   * while the right page turns. z-[-1] puts it below under-page,
                   * spine, shade, and flipper but above the transparent viewport
                   * background.
                   */}
                  <div
                    className="pointer-events-none absolute inset-0 z-[-1]"
                    aria-hidden
                    data-layer="current-bg"
                  >
                    {pagesNatural[displayIndex]}
                  </div>

                  {/* Under-page: destination page revealed under the turning leaf */}
                  <div
                    className="rtl-book-under rtl-book-under--live pointer-events-none absolute inset-y-0 z-0"
                    style={
                      phase === "next"
                        ? { right: 0, width: entryWidth(displayIndex + 1) }
                        : { left: 0, width: entryWidth(displayIndex - 1) }
                    }
                    aria-hidden
                    data-layer="under"
                  >
                    {underChild}
                  </div>

                  {/* Shade cast on the under-page */}
                  <div
                    className={`rtl-book-under-shade rtl-book-under-shade--${phase} pointer-events-none absolute inset-0 z-[2]`}
                    aria-hidden
                    data-layer="spine-shade"
                  />

                  {/* Turning leaf: always 500 px, anchored at hinge edge */}
                  <div
                    className={`rtl-book-flipper-y rtl-book-flipper-y--${phase} pointer-events-none absolute z-[5]`}
                    style={
                      {
                        top: 0,
                        bottom: 0,
                        width: FLIP_PAGE_WIDTH_PX,
                        ...(phase === "next" ? { right: 0 } : { left: 0 }),
                        overflow: "hidden",
                        transformStyle: "preserve-3d",
                        willChange: "transform"
                      } as CSSProperties
                    }
                    data-layer={`flipper-${phase}`}
                    onAnimationEnd={onMainFlipAnimationEnd}
                  >
                    <div
                      className={`turning-sheet turning-sheet--${phase} h-full w-full`}
                    >
                      <div className="turning-sheet__twist h-full w-full">
                        <div className="turning-sheet__bow h-full w-full">
                          <div
                            className={`turning-sheet__shadow turning-sheet__shadow--${phase} pointer-events-none absolute inset-0`}
                            aria-hidden
                            data-layer={`cast-${phase}`}
                          />
                          <div
                            className={`turning-sheet__front turning-sheet__front--${phase} absolute inset-0 overflow-hidden`}
                            style={
                              /*
                               * All 1000-px entries (single story pages AND spreads)
                               * need half-cropping inside the 500-px turning leaf:
                               *   next → show right half (illustrated page or right spread)
                               *   prev → show left half (blank paper or left spread)
                               * cover / back-cover are 500 px so no crop is needed.
                               */
                              bookData[displayIndex]?.type !== "cover" &&
                              bookData[displayIndex]?.type !== "back-cover"
                                ? phase === "next"
                                  ? { display: "flex", justifyContent: "flex-end" }
                                  : { display: "flex", justifyContent: "flex-start" }
                                : undefined
                            }
                          >
                            {pagesLeaf[displayIndex]}
                          </div>
                          <div
                            className={`turning-sheet__back turning-sheet__back--${phase} absolute inset-0`}
                            aria-hidden
                            data-layer={`back-${phase}`}
                          />
                          <div
                            className={`turning-sheet__curl turning-sheet__curl--${phase} pointer-events-none absolute inset-0`}
                            aria-hidden
                            data-layer={`curl-${phase}`}
                          />
                          <div
                            className={`turning-sheet__highlight turning-sheet__highlight--${phase} pointer-events-none absolute inset-0`}
                            aria-hidden
                            data-layer={`rim-light-${phase}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Dev label */}
            {TURN_DEBUG ? (
              <div
                className="pointer-events-none absolute left-1 top-1 z-[40] max-w-[380px] rounded-md border border-amber-500/40 bg-black/78 px-2 py-1.5 font-mono text-[10px] leading-snug text-amber-100 shadow-lg"
                data-turn-debug
              >
                <div className="font-semibold text-amber-300">turnDebug=1</div>
                <div className="mt-0.5 break-words">{debugLabel}</div>
              </div>
            ) : null}

            {onEdgeStoryNext ? (
              <button
                type="button"
                className="flip-edge-zone flip-edge-zone--next absolute inset-y-0 left-0 z-[30] w-[18%] cursor-pointer border-0 bg-transparent p-0"
                aria-label="עמוד הבא"
                title="עמוד הבא"
                onClick={onEdgeStoryNext}
              />
            ) : null}
            {onEdgeStoryPrev ? (
              <button
                type="button"
                className="flip-edge-zone flip-edge-zone--prev absolute inset-y-0 right-0 z-[30] w-[18%] cursor-pointer border-0 bg-transparent p-0"
                aria-label="עמוד קודם"
                title="עמוד קודם"
                onClick={onEdgeStoryPrev}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
