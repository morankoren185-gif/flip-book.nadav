import type { ReactNode } from "react";

/** Single leaf dimensions (px) — used by BookFlipBook */
export const FLIP_PAGE_WIDTH_PX = 600;
export const FLIP_PAGE_HEIGHT_PX = 800;

/** Spread dimensions (two leaves joined) */
export const SPREAD_PAGE_WIDTH_PX = 1200;

type PageFrameProps = { children: ReactNode };

/**
 * Container for a single page inside the flip engine.
 * Intentionally frameless — templates provide their own full-bleed backgrounds.
 * BookBoard chrome is stripped via the `.book-leaf-single` CSS context rules.
 */
export function PageFrame({ children }: PageFrameProps) {
  return <div className="book-leaf-single">{children}</div>;
}

/**
 * Container for a two-page spread inside the flip engine (1200 × 800).
 * Same full-bleed approach — templates fill the entire frame.
 */
export function SpreadPageFrame({ children }: PageFrameProps) {
  return <div className="book-leaf-spread">{children}</div>;
}
