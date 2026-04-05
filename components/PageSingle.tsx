import type { BookPageSingle } from "@/types/book";
import { Layout } from "@/components/Layout";
import { BookBoard } from "@/components/BookBoard";
import { BookImage } from "@/components/BookImage";
import { objectPositionForLayout } from "@/lib/artSafeFocus";
import {
  isStoryFinalePage,
  tunedSingleObjectPosition
} from "@/lib/readingTune";

type PageSingleProps = {
  page: BookPageSingle;
};

export function PageSingle({ page }: PageSingleProps) {
  const baseObj = objectPositionForLayout(page.layout);
  const obj = tunedSingleObjectPosition(page.id, page.layout, baseObj);
  const isFinale = isStoryFinalePage(page.id);

  return (
    <BookBoard className="mx-auto w-full max-w-[min(440px,93vw)] md:max-w-[min(520px,48vw)] lg:max-w-[min(480px,44vw)]">
      <div
        className={`relative aspect-[3/4] w-full overflow-hidden rounded-[var(--book-radius-inner)] bg-[var(--book-page-bg)] md:aspect-[3/4] ${isFinale ? "book-finale-page" : ""}`.trim()}
      >
        <BookImage
          src={page.image}
          alt=""
          fill
          className="object-contain object-center"
          style={{ objectPosition: obj }}
          sizes="(max-width: 768px) 93vw, (max-width: 1200px) 48vw, 480px"
          priority={false}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] book-page-illu-vignette"
          aria-hidden
        />
        {isFinale ? (
          <div
            className="book-finale-vignette pointer-events-none absolute inset-0 z-[2]"
            aria-hidden
          />
        ) : null}
        <Layout variant={page.layout} mode={isFinale ? "finale" : "default"}>
          <p className="m-0">{page.text}</p>
        </Layout>
      </div>
    </BookBoard>
  );
}
