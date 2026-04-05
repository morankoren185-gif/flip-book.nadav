import type { ReactNode } from "react";
import type { BookPageSpread, PageLayout } from "@/types/book";
import { Layout } from "@/components/Layout";
import { BookBoard } from "@/components/BookBoard";
import { BookImage } from "@/components/BookImage";
import { objectPositionForLayout } from "@/lib/artSafeFocus";
import {
  tunedSpreadHalfObjectPosition,
  tunedSpreadSharedObjectPosition
} from "@/lib/readingTune";

type PageSpreadProps = {
  page: BookPageSpread;
};

function SpreadHalf({
  children,
  imageSrc,
  side,
  layout,
  spreadId
}: {
  children: ReactNode;
  imageSrc: string | undefined;
  side: "right" | "left";
  layout: PageLayout;
  spreadId: string | number;
}) {
  if (!imageSrc) return null;
  const base = objectPositionForLayout(layout);
  const obj = tunedSpreadHalfObjectPosition(spreadId, side, base);
  return (
    <div
      className={`relative min-h-[220px] flex-1 basis-1/2 overflow-hidden bg-[var(--book-page-bg)] sm:min-h-[280px] md:min-h-0 ${
        side === "right" ? "border-e border-black/[0.04]" : ""
      }`}
    >
      <BookImage
        src={imageSrc}
        alt=""
        fill
        className="object-contain object-center"
        style={{ objectPosition: obj }}
        sizes="(max-width: 768px) 46vw, 520px"
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] book-spread-half-wash"
        aria-hidden
      />
      {children}
    </div>
  );
}

export function PageSpread({ page }: PageSpreadProps) {
  const sharedImage = page.image;
  const rightSrc = sharedImage ?? page.rightImage;
  const leftSrc = sharedImage ?? page.leftImage;

  if (sharedImage) {
    const sharedPos = tunedSpreadSharedObjectPosition(page.id, "50% 48%");
    return (
      <BookBoard className="mx-auto w-full max-w-[min(1020px,97vw)] md:max-w-[min(1080px,96vw)]">
        <div
          className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--book-radius-inner)] bg-[var(--book-page-bg)] sm:aspect-[2/1.05] lg:aspect-[2/1]"
          dir="rtl"
          lang="he"
        >
          <BookImage
            src={sharedImage}
            alt=""
            fill
            className="object-contain object-center"
            style={{ objectPosition: sharedPos }}
            sizes="(max-width: 1200px) 97vw, 1080px"
          />
          <div
            className="pointer-events-none absolute inset-0 book-spread-continuous-wash"
            aria-hidden
          />
          <div className="book-spread-crease" aria-hidden />
          <div className="absolute inset-0 grid grid-cols-2" dir="rtl">
            <div className="relative min-h-0 min-w-0">
              <Layout variant={page.rightLayout} measure="spread">
                <p className="m-0">{page.rightText}</p>
              </Layout>
            </div>
            <div className="relative min-h-0 min-w-0">
              <Layout variant={page.leftLayout} measure="spread">
                <p className="m-0">{page.leftText}</p>
              </Layout>
            </div>
          </div>
        </div>
      </BookBoard>
    );
  }

  return (
    <BookBoard className="mx-auto w-full max-w-[min(1020px,97vw)] md:max-w-[min(1080px,96vw)]">
      <div
        className="relative flex min-h-[220px] w-full flex-row overflow-hidden rounded-[var(--book-radius-inner)] sm:min-h-[280px] md:aspect-[2/1.05] lg:aspect-[2/1] md:min-h-0"
        dir="rtl"
        lang="he"
      >
        <SpreadHalf
          imageSrc={rightSrc}
          side="right"
          layout={page.rightLayout}
          spreadId={page.id}
        >
          <Layout variant={page.rightLayout} measure="spread">
            <p className="m-0">{page.rightText}</p>
          </Layout>
        </SpreadHalf>
        <SpreadHalf
          imageSrc={leftSrc}
          side="left"
          layout={page.leftLayout}
          spreadId={page.id}
        >
          <Layout variant={page.leftLayout} measure="spread">
            <p className="m-0">{page.leftText}</p>
          </Layout>
        </SpreadHalf>
        <div className="book-spread-crease" aria-hidden />
      </div>
    </BookBoard>
  );
}
