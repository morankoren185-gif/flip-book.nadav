import type { PageLayout } from "@/types/book";

/**
 * Mild focal bias for object-position — works with both cover and contain;
 * keeps adjustments gentle so full compositions read naturally.
 */
export function objectPositionForLayout(layout: PageLayout): string {
  switch (layout) {
    case "top-right":
      return "42% 56%";
    case "top-left":
      return "58% 56%";
    case "bottom-right":
      return "42% 44%";
    case "bottom-left":
      return "58% 44%";
    case "center":
      return "50% 48%";
    default:
      return "50% 50%";
  }
}
