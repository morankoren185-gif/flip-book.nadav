import type { BookPageCover } from "@/types/book";
import { BookBoard } from "@/components/BookBoard";
import { BookImage } from "@/components/BookImage";

type PageCoverProps = {
  page: BookPageCover;
};

export function PageCover({ page }: PageCoverProps) {
  return (
    <BookBoard className="book-board-premium mx-auto w-full max-w-[min(460px,94vw)] md:max-w-[min(540px,46vw)]">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--book-radius-inner)] bg-[#1a1612]"
        dir="rtl"
        lang="he"
      >
        <BookImage
          src={page.image}
          alt={page.title}
          fill
          className="object-contain object-center"
          style={{ objectPosition: "50% 45%" }}
          sizes="(max-width: 768px) 94vw, 540px"
          priority
        />
        {/* Depth: soft vignette + magical highlight — no heavy slabs */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,transparent_0%,rgba(26,22,18,0.18)_88%,rgba(14,12,10,0.42)_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0d0b]/55 via-transparent to-amber-100/[0.07]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30 bg-gradient-to-br from-white/25 via-transparent to-transparent"
          aria-hidden
        />
        {/* Type: narrow column, lower area — does not march across the whole cover */}
        <div className="absolute inset-x-0 bottom-0 flex justify-end px-[6%] pb-[9%] pt-[40%] sm:px-[7%] sm:pb-[10%]">
          <div className="relative w-[min(100%,14.75rem)] sm:w-[min(100%,16rem)] text-right">
            <div
              className="pointer-events-none absolute -inset-x-[20%] -inset-y-[28%] opacity-[0.92]"
              style={{
                background:
                  "radial-gradient(ellipse 90% 75% at 80% 65%, rgba(255,250,242,0.28) 0%, rgba(255,248,238,0.08) 55%, transparent 78%)"
              }}
              aria-hidden
            />
            <h1
              className="cover-title relative m-0 text-pretty text-[clamp(0.92rem,2.6vw,1.28rem)] font-medium leading-[1.28] tracking-[0.02em] text-[#faf6ef]"
              style={{
                textShadow:
                  "0 2px 18px rgba(12,10,8,0.55), 0 1px 3px rgba(0,0,0,0.35), 0 0 1px rgba(255,252,245,0.45)"
              }}
            >
              {page.title}
            </h1>
            <p
              className="cover-subtitle relative mt-2.5 text-pretty text-[clamp(0.72rem,1.85vw,0.84rem)] font-normal leading-[1.45] text-[#f0ebe3]/92"
              style={{
                textShadow:
                  "0 1px 10px rgba(12,10,8,0.45), 0 0 12px rgba(15,12,10,0.35)"
              }}
            >
              {page.subtitle}
            </p>
            <p
              className="cover-author relative mt-5 text-[clamp(0.68rem,1.65vw,0.78rem)] font-normal leading-normal text-[#e5dfd6]/88"
              style={{
                textShadow: "0 1px 8px rgba(10,8,6,0.5)"
              }}
            >
              {page.author}
            </p>
          </div>
        </div>
      </div>
    </BookBoard>
  );
}
