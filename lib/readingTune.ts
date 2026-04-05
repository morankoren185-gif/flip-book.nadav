import type { PageLayout } from "@/types/book";

/** Softer tuning so illustrations stay whole when using object-contain */
const SINGLE_OBJECT: Partial<Record<number, string>> = {
  1: "48% 55%",
  4: "54% 44%",
  5: "46% 56%",
  8: "54% 54%",
  11: "50% 50%",
  12: "50% 50%",
  15: "44% 44%",
  16: "44% 44%",
  19: "50% 52%",
  20: "44% 44%",
  21: "46% 58%",
  22: "50% 48%",
  23: "42% 44%",
  24: "50% 42%"
};

const SPREAD_SHARED_OBJECT: Partial<Record<string, string>> = {
  "2-3": "50% 45%",
  "13-14": "50% 52%",
  "17-18": "50% 48%"
};

const SPREAD_HALF_OBJECT: Partial<
  Record<string, { right?: string; left?: string }>
> = {
  "6-7": { right: "46% 48%", left: "54% 52%" },
  "9-10": { right: "46% 50%", left: "54% 48%" }
};

export function tunedSingleObjectPosition(
  pageId: number | string,
  _layout: PageLayout,
  fallbackFromLayout: string
): string {
  if (typeof pageId === "number" && SINGLE_OBJECT[pageId] != null) {
    return SINGLE_OBJECT[pageId]!;
  }
  return fallbackFromLayout;
}

export function tunedSpreadSharedObjectPosition(
  pageId: string | number,
  defaultPosition: string
): string {
  const key = String(pageId);
  return SPREAD_SHARED_OBJECT[key] ?? defaultPosition;
}

export function tunedSpreadHalfObjectPosition(
  pageId: string | number,
  side: "right" | "left",
  layoutFallback: string
): string {
  const row = SPREAD_HALF_OBJECT[String(pageId)];
  if (!row) return layoutFallback;
  const hit = side === "right" ? row.right : row.left;
  return hit ?? layoutFallback;
}

export function isStoryFinalePage(pageId: number | string): boolean {
  return pageId === 24;
}
