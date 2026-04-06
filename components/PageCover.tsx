import type { BookPageCover } from "@/types/book";
import { CoverTemplate } from "@/components/templates/Cover";

type PageCoverProps = {
  page: BookPageCover;
};

/** Fallback cover — same art-directed shell as `CoverTemplate`. */
export function PageCover({ page }: PageCoverProps) {
  return <CoverTemplate page={page} />;
}
