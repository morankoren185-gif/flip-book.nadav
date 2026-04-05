import type { BookPageCover } from "@/types/book";
import { BookBoard } from "@/components/BookBoard";
import { BookImage } from "@/components/BookImage";

export function CoverTemplate({ page }: { page: BookPageCover }) {
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
          style={{ objectPosition: "50% 42%" }}
          sizes="94vw"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_68%_50%_at_50%_28%,transparent_0%,rgba(26,22,18,0.14)_85%,rgba(14,12,10,0.38)_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0d0b]/42 via-transparent to-amber-50/[0.06]"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 flex justify-end px-[7%] pb-[10%] pt-[38%]">
          <div className="relative w-[min(100%,15rem)] text-right">
            <div
              className="pointer-events-none absolute -inset-x-[18%] -inset-y-[30%] opacity-90"
              style={{
                background:
                  "radial-gradient(ellipse 88% 72% at 82% 62%, rgba(255,250,242,0.26) 0%, transparent 75%)"
              }}
              aria-hidden
            />
            <h1
              className="relative m-0 text-pretty text-[clamp(0.88rem,2.5vw,1.22rem)] font-medium leading-[1.26] tracking-[0.03em] text-[#faf6ef]"
              style={{
                textShadow:
                  "0 2px 16px rgba(10,8,6,0.5), 0 1px 2px rgba(0,0,0,0.35)"
              }}
            >
              {page.title}
            </h1>
            <p
              className="relative mt-2.5 text-pretty text-[clamp(0.7rem,1.75vw,0.8rem)] font-normal leading-[1.5] text-[#eee8df]/93"
              style={{ textShadow: "0 1px 10px rgba(8,6,4,0.45)" }}
            >
              {page.subtitle}
            </p>
            <p
              className="relative mt-5 text-[clamp(0.66rem,1.55vw,0.76rem)] font-normal text-[#e2dbd2]/88"
              style={{ textShadow: "0 1px 8px rgba(8,6,4,0.5)" }}
            >
              {page.author}
            </p>
          </div>
        </div>
      </div>
    </BookBoard>
  );
}
