"use client";

import type { ReactNode } from "react";
import type { BookPageSingle, BookPageSpread } from "@/types/book";
import { BookBoard } from "@/components/BookBoard";
import { BookImage } from "@/components/BookImage";
import { isStoryFinalePage } from "@/lib/readingTune";

const defaultSingleBoard =
  "mx-auto w-full max-w-[min(440px,93vw)] md:max-w-[min(520px,48vw)] lg:max-w-[min(480px,44vw)]";

const defaultSpreadBoard =
  "mx-auto w-full max-w-[min(1020px,97vw)] md:max-w-[min(1080px,96vw)]";

type SingleArtPageProps = {
  page: BookPageSingle;
  objectPosition: string;
  boardClassName?: string;
  /** Optional extra layers above image, below vignette (z-0 — keep below z-1). */
  underVignette?: ReactNode;
  children: ReactNode;
};

export function SingleArtPage({
  page,
  objectPosition,
  boardClassName = defaultSingleBoard,
  underVignette,
  children
}: SingleArtPageProps) {
  const isFinale = isStoryFinalePage(page.id);
  return (
    <BookBoard className={boardClassName}>
      <div
        className={`relative aspect-[3/4] w-full overflow-hidden rounded-[var(--book-radius-inner)] bg-[var(--book-page-bg)] ${isFinale ? "book-finale-page" : ""}`.trim()}
      >
        <BookImage
          src={page.image}
          alt=""
          fill
          className="object-contain object-center"
          style={{ objectPosition }}
          sizes="500px"
        />
        {underVignette}
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
        {children}
      </div>
    </BookBoard>
  );
}

type SpreadContinuousFrameProps = {
  page: BookPageSpread;
  objectPosition: string;
  boardClassName?: string;
  /** Full-bleed washes under text grid */
  atmosphere?: ReactNode;
  /** Two grid cells in reading order: first = right page, second = left page */
  cells: [ReactNode, ReactNode];
};

export function SpreadContinuousFrame({
  page,
  objectPosition,
  boardClassName = defaultSpreadBoard,
  atmosphere,
  cells
}: SpreadContinuousFrameProps) {
  return (
    <BookBoard className={boardClassName}>
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--book-radius-inner)] bg-[var(--book-page-bg)] sm:aspect-[2/1.05] lg:aspect-[2/1]"
        dir="rtl"
        lang="he"
      >
        <BookImage
          src={page.image!}
          alt=""
          fill
          className="object-contain object-center"
          style={{ objectPosition }}
          sizes="1000px"
        />
        {atmosphere}
        <div className="book-spread-crease" aria-hidden />
        <div className="absolute inset-0 z-[2] grid grid-cols-2" dir="rtl">
          <div className="relative min-h-0 min-w-0">{cells[0]}</div>
          <div className="relative min-h-0 min-w-0">{cells[1]}</div>
        </div>
      </div>
    </BookBoard>
  );
}

type SpreadDualFrameProps = {
  boardClassName?: string;
  right: { src: string; position: string; overlay?: ReactNode; content: ReactNode };
  left: { src: string; position: string; overlay?: ReactNode; content: ReactNode };
};

export function SpreadDualFrame({
  boardClassName = defaultSpreadBoard,
  right,
  left
}: SpreadDualFrameProps) {
  return (
    <BookBoard className={boardClassName}>
      <div
        className="relative flex min-h-[220px] w-full flex-row overflow-hidden rounded-[var(--book-radius-inner)] sm:min-h-[280px] md:aspect-[2/1.05] lg:aspect-[2/1] md:min-h-0"
        dir="rtl"
        lang="he"
      >
        <div className="relative min-h-[220px] flex-1 basis-1/2 overflow-hidden bg-[var(--book-page-bg)] border-e border-black/[0.04] sm:min-h-[280px] md:min-h-0">
          <BookImage
            src={right.src}
            alt=""
            fill
            className="object-contain object-center"
            style={{ objectPosition: right.position }}
            sizes="46vw"
          />
          {right.overlay}
          {right.content}
        </div>
        <div className="relative min-h-[220px] flex-1 basis-1/2 overflow-hidden bg-[var(--book-page-bg)] sm:min-h-[280px] md:min-h-0">
          <BookImage
            src={left.src}
            alt=""
            fill
            className="object-contain object-center"
            style={{ objectPosition: left.position }}
            sizes="46vw"
          />
          {left.overlay}
          {left.content}
        </div>
        <div className="book-spread-crease" aria-hidden />
      </div>
    </BookBoard>
  );
}
